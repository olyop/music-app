import { v4 as uuid } from "uuid"
import ApolloServer from "apollo-server-express"
import columnNames from "../../../sql/columnNames.js"
import s3Upload from "../../../helpers/s3/s3Upload.js"
import sqlJoin from "../../../helpers/sql/sqlJoin.js"
import resize from "../../../helpers/resolver/resize.js"
import sqlExists from "../../../helpers/sql/sqlExists.js"
import sqlUnique from "../../../helpers/sql/sqlUnique.js"
import isAlbum from "../../../helpers/validators/isAlbum.js"
import sqlParseRow from "../../../helpers/sql/sqlParseRow.js"
import sqlTransaction from "../../../helpers/sql/sqlTransaction.js"
import s3CatalogObjectKey from "../../../helpers/s3/s3CatalogObjectKey.js"
import determineReleased from "../../../helpers/resolver/determineReleased.js"
import uploadFileFromClient from "../../../helpers/resolver/uploadFileFromClient.js"
import determineFailedChecks from "../../../helpers/resolver/determineFailedChecks.js"
import determineChecksResults from "../../../helpers/resolver/determineChecksResults.js"

import { IMAGE_SIZES } from "../../../globals/miscellaneous.js"
import { INSERT_ALBUM, INSERT_ALBUM_ARTIST } from "../../../sql/index.js"

const { UserInputError } = ApolloServer

const addAlbum = async ({ args }) => {

  const cover = await uploadFileFromClient(args.cover)

  if (!isAlbum({ ...args, cover })) {
    throw new UserInputError("Invalid arguments.")
  }

  const checks = [{
    name: "isAlbumUnique",
    check: sqlUnique({
      table: "albums",
      column: "title",
      value: args.title,
    }),
  },{
    name: "doArtistsExist",
    check: sqlExists({
      table: "artists",
      column: "artist_id",
      value: args.artistIds,
    }),
  }]

  const checksResults =
    await determineChecksResults(checks)

  if (!checksResults.every(Boolean)) {
    const failedChecks = determineFailedChecks(checks, checksResults)
    throw new UserInputError("Checks failed.", { failedChecks })
  }

  const albumId = uuid()

  const albumInsert = {
    query: INSERT_ALBUM,
    parse: sqlParseRow,
    variables: [{
      string: false,
      key: "columnNames",
      value: sqlJoin(columnNames.album),
    },{
      key: "albumId",
      value: albumId,
    },{
      key: "title",
      value: args.title,
      parameterized: true,
    },{
      string: false,
      key: "released",
      value: determineReleased(args.released),
    }],
  }

  const artistInsert = (artistId, index) => ({
    query: INSERT_ALBUM_ARTIST,
    variables: [{
      key: "albumId",
      value: albumId,
    },{
      key: "artistId",
      value: artistId,
    },{
      key: "index",
      value: index,
      string: false,
    }],
  })

  const transaction =
    sqlTransaction([
      albumInsert,
      ...args.artistIds.map(artistInsert),
    ])

  const coverUploads = [{
    key: s3CatalogObjectKey({
      id: albumId,
      size: "HALF",
      format: "jpg",
    }),
    data: resize({
      image: cover,
      dim: IMAGE_SIZES.ALBUM.HALF,
    }),
  },{
    key: s3CatalogObjectKey({
      id: albumId,
      size: "FULL",
      format: "jpg",
    }),
    data: resize({
      image: cover,
      dim: IMAGE_SIZES.ALBUM.FULL,
    }),
  }]

  const result = await Promise.all([
    transaction,
    ...coverUploads.map(s3Upload),
  ])

  return result[0][0]
}

export default addAlbum
