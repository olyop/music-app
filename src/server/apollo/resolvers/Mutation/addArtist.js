import {
  isArtist,
  resolver,
  resizeSmall,
  resizeLarge,
  parseSqlRow,
  resizeMedium,
  awsCatalogKey,
  queryDatabase,
  isColumnUnique,
  uploadFilesToS3,
  uploadFileFromClient,
} from "../../../helpers/index.js"

import ApolloServerExpress from "apollo-server-express"

import uuid from "uuid"
import { INSERT_ARTIST } from "../../../sql/index.js"

const { UserInputError } = ApolloServerExpress

const addArtist = async ({ args }) => {

  const photo = await uploadFileFromClient(args.photo)

  if (!isArtist({ ...args, photo })) {
    throw new UserInputError("Invalid arguments.")
  }

  const { name } = args

  const isNameUnique = await isColumnUnique("name", name, "artists")

  if (!isNameUnique) {
    throw new UserInputError("Database checks failed.")
  }

  const artistId = uuid.v4()

  const artistInsert =
    queryDatabase({
      query: INSERT_ARTIST,
      parse: parseSqlRow,
      variables: {
        artistId,
        name,
      },
    })

  const photosUpload =
    uploadFilesToS3([
      { key: awsCatalogKey(artistId, "small"), file: resizeSmall(photo) },
      { key: awsCatalogKey(artistId, "large"), file: resizeLarge(photo) },
      { key: awsCatalogKey(artistId, "medium"), file: resizeMedium(photo) },
    ])

  const [ artist ] = await Promise.all([
    artistInsert,
    ...photosUpload,
  ])

  return artist
}

export default resolver(addArtist)
