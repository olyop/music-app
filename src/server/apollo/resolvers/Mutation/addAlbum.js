import {
  resolver,
  parseSqlRow,
  resizeSmall,
  resizeLarge,
  isAlbumValid,
  resizeMedium,
  awsCatalogKey,
  determineReleased,
} from "../../../helpers/index.js"

import uuid from "uuid"
import s3 from "../../../s3.js"
import { sql } from "../../../database/pg.js"
import { AWS_S3_BUCKET } from "../../../globals.js"
import { INSERT_ALBUM, INSERT_ALBUM_ARTIST } from "../../../sql/index.js"

const addAlbum = async ({ args }) => {

  // upload photo
  let chunks = []
  const stream = await args.cover
  const upload = stream.createReadStream()
  for await (const chunk of upload) chunks.push(chunk)
  const cover = Buffer.concat(chunks)

  // data validation
  if (!isAlbumValid({ ...args, cover })) {
    throw "Invalid data."
  }

  const albumId = uuid.v4()
  const { title, released, artists } = args

  const albumInsert =
    sql(INSERT_ALBUM, {
      albumId,
      title,
      released: determineReleased(released),
    })

  const albumArtistInsert = (artistId, artistIndex) =>
    sql(INSERT_ALBUM_ARTIST, {
      albumId,
      artistId,
      artistIndex,
      albumArtistId: uuid.v4(),
    })

  const albumArtistsInserts = artists.map(albumArtistInsert)

  const photos = [
    { size: "small" , img: resizeSmall(cover) , },
    { size: "medium", img: resizeMedium(cover), },
    { size: "large" , img: resizeLarge(cover) , },
  ]

  const coverUpload = ({ size, img }) =>
    s3.upload({
      Body: img,
      ACL: "private",
      Bucket: AWS_S3_BUCKET,
      Key: awsCatalogKey(albumId, size),
    }).promise()

  const coversUpload = photos.map(coverUpload)

  const [ album ] = await Promise.all([
    albumInsert,
    ...coversUpload,
    ...albumArtistsInserts,
  ])

  return parseSqlRow(album)
}

export default resolver(addAlbum)
