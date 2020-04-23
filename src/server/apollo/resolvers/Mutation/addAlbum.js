import {
  isAlbum,
  resolver,
  doIdsExist,
  parseSqlRow,
  resizeLarge,
  resizeMedium,
  queryDatabase,
  awsCatalogKey,
  isColumnUnique,
  uploadFilesToS3,
  determineReleased,
  uploadFileFromClient,
} from "../../../helpers/index.js"

import ApolloServerExpress from "apollo-server-express"

import uuid from "uuid"
import every from "lodash/every.js"
import { INSERT_ALBUM, INSERT_ALBUM_ARTIST } from "../../../sql/index.js"

const { UserInputError } = ApolloServerExpress

const addAlbum = async ({ args }) => {

  const cover = await uploadFileFromClient(args.cover)

  if (!isAlbum({ ...args, cover })) {
    throw new UserInputError("Invalid arguments.")
  }

  const {
    title,
    released,
    artistIds,
  } = args

  const isTitleUnique = isColumnUnique("title", title, "albums")
  const doArtistsExist = doIdsExist(artistIds, "artist_id", "artists")

  const databaseChecks = Promise.all([
    isTitleUnique,
    doArtistsExist,
  ])

  if (!every(await databaseChecks)) {
    throw new UserInputError("Database checks failed.")
  }

  const albumId = uuid.v4()

  const albumInsert =
    queryDatabase({
      query: INSERT_ALBUM,
      parse: parseSqlRow,
      variables: {
        albumId,
        title,
        released: determineReleased(released),
      },
    })

  const albumArtistsInserts =
    artistIds.map(
      (artistId, artistIndex) => (
        queryDatabase({
          query: INSERT_ALBUM_ARTIST,
          variables: {
            albumId,
            artistId,
            artistIndex,
            albumArtistId: uuid.v4(),
          },
        })
      ),
    )

  const coversUpload =
    uploadFilesToS3([
      { key: awsCatalogKey(albumId, "index"), file: cover },
      { key: awsCatalogKey(albumId, "large"), file: resizeLarge(cover) },
      { key: awsCatalogKey(albumId, "medium"), file: resizeMedium(cover) },
    ])

  const album = await albumInsert

  await Promise.all([
    ...coversUpload,
    ...albumArtistsInserts,
  ])

  return album
}

export default resolver(addAlbum)
