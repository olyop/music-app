import {
  resolver,
  parseSqlRow,
  resizeSmall,
  resizeLarge,
  isAlbumValid,
  resizeMedium,
  determineReleased,
} from "../../../helpers/index.js"

import uuid from "uuid"
import s3 from "../../../s3.js"
import toUpper from "lodash/toUpper.js"
import { sql } from "../../../database/pg.js"
import { INSERT_ARTIST, INSERT_ALBUM_ARTIST } from "../../../sql/index.js"

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

  const albumInsert =
    sql(INSERT_ARTIST, {
      albumId,
      title,
      released: determineReleased(released),
    })

  const albumArtistInsert = artistId =>
    sql(INSERT_ALBUM_ARTIST, {
      albumArtistId: uuid.v4(),
      albumId,
      artistId,
    })

  const albumArtistsInserts = artists.map(albumArtistInsert)

  const photos = [
    { size: "small" , img: resizeSmall(cover) , },
    { size: "medium", img: resizeMedium(cover), },
    { size: "large" , img: resizeLarge(cover) , },
  ]

  const coverUpload = ({ size, img })
    s3.upload({
      Body: img,
      ACL: "private",
      Bucket: process.env.S3_BUCKET,
      Key: `catalog/${albumId}_${toUpper(size)}.jpg`,
    }).promise()

  const coversUpload = photos.map(coverUpload)

  const [ album ] = await Promise.all([
    albumInsert,
    ...albumArtistsInserts,
    ...coversUpload,
  ])

  return parseSqlRow(album)
}

export default resolver(addAlbum)
