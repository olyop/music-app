import {
  isArtist,
  resolver,
  resizeSmall,
  resizeLarge,
  parseSqlRow,
  resizeMedium,
  awsCatalogKey,
} from "../../../helpers/index.js"

import ApolloServerExpress from "apollo-server-express"

import uuid from "uuid"
import s3 from "../../../s3.js"
import { sql, sqlIsUnique } from "../../../database/pg.js"
import { AWS_S3_ACL, AWS_S3_BUCKET } from "../../../globals.js"
import { INSERT_ARTIST, WHERE_ARTIST } from "../../../sql/index.js"

const { UserInputError } = ApolloServerExpress

const addArtist = async ({ args }) => {

  // upload photo
  let chunks = []
  const stream = await args.photo
  const upload = stream.createReadStream()
  for await (const chunk of upload) chunks.push(chunk)
  const photo = Buffer.concat(chunks)

  // data validation
  if (!isArtist({ ...args, photo })) {
    throw new UserInputError("Invalid arguments.")
  }

  // check name is unique
  if (!(await sqlIsUnique({
    query: WHERE_ARTIST,
    val: args.name,
    col: "name",
  }))) {
    throw new UserInputError("Name already exists.")
  }

  const artistId = uuid.v4()
  const { name } = args

  const artistInsert =
    sql({
      query: INSERT_ARTIST,
      args: {
        artistId,
        name,
      },
    })

  const photos = [
    { size: "small" , img: resizeSmall(photo) , },
    { size: "medium", img: resizeMedium(photo), },
    { size: "large" , img: resizeLarge(photo) , },
  ]

  const photoUpload = ({ size, img }) =>
    s3.upload({
      Body: img,
      ACL: AWS_S3_ACL,
      Bucket: AWS_S3_BUCKET,
      Key: awsCatalogKey(artistId, size),
    }).promise()

  const photosUpload = photos.map(photoUpload)

  const artist = await artistInsert
  await Promise.all(photosUpload)

  return parseSqlRow(artist)
}

export default resolver(addArtist)
