import {
  resolver,
  resizeSmall,
  resizeLarge,
  parseSqlRow,
  resizeMedium,
  isArtistValid,
  awsCatalogKey,
} from "../../../helpers/index.js"

import uuid from "uuid"
import s3 from "../../../s3.js"
import { sql } from "../../../database/pg.js"
import { INSERT_ARTIST } from "../../../sql/index.js"

const addArtist = async ({ args }) => {

  // upload photo
  let chunks = []
  const stream = await args.photo
  const upload = stream.createReadStream()
  for await (const chunk of upload) chunks.push(chunk)
  const photo = Buffer.concat(chunks)

  // data validation
  if (!isArtistValid({ ...args, photo })) {
    throw "Invalid data."
  }

  const artistId = uuid.v4()
  const { name } = args

  const artistInsert =
    sql(INSERT_ARTIST, {
      artistId,
      name,
    })

  const photos = [
    { size: "small" , img: resizeSmall(photo) , },
    { size: "medium", img: resizeMedium(photo), },
    { size: "large" , img: resizeLarge(photo) , },
  ]

  const photoUpload = ({ size, img }) =>
    s3.upload({
      Body: img,
      ACL: "private",
      Bucket: process.env.AWS_S3_BUCKET,
      Key: awsCatalogKey(artistId, size),
    }).promise()

  const photosUpload = photos.map(photoUpload)

  const [ artist ] = await Promise.all([
    artistInsert,
    ...photosUpload,
  ])

  return parseSqlRow(artist)
}

export default resolver(addArtist)
