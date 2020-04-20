import {
  isAlbum,
  resolver,
  parseSqlRow,
  resizeLarge,
  resizeMedium,
  awsCatalogKey,
  determineReleased,
} from "../../../helpers/index.js"

import ApolloServerExpress from "apollo-server-express"

import uuid from "uuid"
import s3 from "../../../s3.js"
import { AWS_S3_ACL, AWS_S3_BUCKET } from "../../../globals.js"
import { importSql, queryDatabase } from "../../../helpers/index.js"
import { WHERE_ALBUM, INSERT_ALBUM, INSERT_ALBUM_ARTIST } from "../../../sql/index.js"

const { UserInputError } = ApolloServerExpress

const addAlbum = async ({ args }) => {

  // upload photo
  let chunks = []
  const stream = await args.cover
  const upload = stream.createReadStream()
  for await (const chunk of upload) chunks.push(chunk)
  const cover = Buffer.concat(chunks)

  // data validation
  if (!isAlbum({ ...args, cover })) {
    throw new UserInputError("Invalid arguments.")
  }

  // check title is unique
  if (!(await sqlIsUnique({
    query: WHERE_ALBUM,
    val: args.title,
    col: "title",
  }))) {
    throw "Title already in use."
  }

  const albumId = uuid.v4()
  const { title, released, artists } = args

  const albumInsert =
    sql({
      query: INSERT_ALBUM,
      parse: parseSqlRow,
      args: {
        albumId,
        title,
        released: determineReleased(released),
      },
    })

  const albumArtistInsert = (artistId, artistIndex) =>
    sql({
      query: INSERT_ALBUM_ARTIST,
      args: {
        albumId,
        artistId,
        artistIndex,
        albumArtistId: uuid.v4(),
      },
    })

  const albumArtistsInserts = artists.map(albumArtistInsert)

  const photos = [
    { size: "medium", img: resizeMedium(cover), },
    { size: "large" , img: resizeLarge(cover) , },
  ]

  const coverUpload = ({ size, img }) =>
    s3.upload({
      Body: img,
      ACL: AWS_S3_ACL,
      Bucket: AWS_S3_BUCKET,
      Key: awsCatalogKey(albumId, size),
    }).promise()

  const coversUpload = photos.map(coverUpload)

  const album = await albumInsert
  await Promise.all(albumArtistsInserts)
  await Promise.all(coversUpload)

  return album
}

export default resolver(addAlbum)
