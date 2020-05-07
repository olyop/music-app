import { v4 as uuid } from "uuid"
import ApolloServer from "apollo-server-express"
import sqlJoin from "../../../helpers/sql/sqlJoin.js"
import columnNames from "../../../sql/columnNames.js"
import s3Upload from "../../../helpers/s3/s3Upload.js"
import sqlQuery from "../../../helpers/sql/sqlQuery.js"
import resize from "../../../helpers/resolver/resize.js"
import sqlUnique from "../../../helpers/sql/sqlUnique.js"
import sqlParseRow from "../../../helpers/sql/sqlParseRow.js"
import isArtist from "../../../helpers/validators/isArtist.js"
import s3CatalogObjectKey from "../../../helpers/s3/s3CatalogObjectKey.js"
import uploadFileFromClient from "../../../helpers/resolver/uploadFileFromClient.js"
import determineFailedChecks from "../../../helpers/resolver/determineFailedChecks.js"
import determineChecksResults from "../../../helpers/resolver/determineChecksResults.js"

import { INSERT_ARTIST } from "../../../sql/index.js"
import { IMAGE_SIZES } from "../../../globals/miscellaneous.js"

const { UserInputError } = ApolloServer

const addArtist = async ({ args }) => {

  const photo = await uploadFileFromClient(args.photo)

  if (!isArtist({ ...args, photo })) {
    throw new UserInputError("Invalid arguments.")
  }

  const checks = [{
    name: "isArtistTaken",
    check: sqlUnique({
      column: "name",
      table: "artists",
      value: args.name,
    }),
  }]

  const checksResults = await determineChecksResults(checks)

  if (!checksResults.every(Boolean)) {
    const failedChecks = determineFailedChecks(checks, checksResults)
    throw new UserInputError("Checks failed.", { failedChecks })
  }

  const artistId = uuid()

  const artistInsert = sqlQuery({
    query: INSERT_ARTIST,
    parse: sqlParseRow,
    variables: [{
      key: "artistId",
      value: artistId,
    },{
      key: "name",
      value: args.name,
      parameterized: true,
    },{
      string: false,
      key: "columnNames",
      value: sqlJoin(columnNames.artist),
    }],
  })

  const photoUploads = [{
    key: s3CatalogObjectKey({
      id: artistId,
      size: "MINI",
      format: "jpg",
    }),
    data: resize({
      image: photo,
      dim: IMAGE_SIZES.ARTIST.MINI,
    }),
  },{
    key: s3CatalogObjectKey({
      id: artistId,
      size: "HALF",
      format: "jpg",
    }),
    data: resize({
      image: photo,
      dim: IMAGE_SIZES.ARTIST.HALF,
    }),
  },{
    key: s3CatalogObjectKey({
      id: artistId,
      size: "FULL",
      format: "jpg",
    }),
    data: resize({
      image: photo,
      dim: IMAGE_SIZES.ARTIST.FULL,
    }),
  }]

  const result = await Promise.all([
    artistInsert,
    ...photoUploads.map(s3Upload),
  ])

  const album = result[0]

  return album
}

export default addArtist
