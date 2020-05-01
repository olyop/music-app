import { v4 as uuid } from "uuid"
import mp3Duration from "mp3-duration"
import ApolloServer from "apollo-server-express"
import columnNames from "../../../../sql/columnNames.js"
import s3Upload from "../../../../helpers/s3/s3Upload.js"
import sqlQuery from "../../../../helpers/sql/sqlQuery.js"
import sqlExists from "../../../../helpers/sql/sqlExists.js"
import isSong from "../../../../helpers/validators/isSong.js"
import sqlParseRow from "../../../../helpers/sql/sqlParseRow.js"
import sqlResExists from "../../../../helpers/sql/sqlResExists.js"
import sqlTransaction from "../../../../helpers/sql/sqlTransaction.js"
import s3CatalogObjectKey from "../../../../helpers/s3/s3CatalogObjectKey.js"
import uploadFileFromClient from "../../../../helpers/resolver/uploadFileFromClient.js"
import determineFailedChecks from "../../../../helpers/resolver/determineFailedChecks.js"
import determineChecksResults from "../../../../helpers/resolver/determineChecksResults.js"

import {
  INSERT_SONG,
  INSERT_SONG_FEAT,
  INSERT_SONG_GENRE,
  EXISTS_ALBUM_SONG,
  INSERT_SONG_ARTIST,
  INSERT_SONG_REMIXER,
} from "../../../../sql/index.js"

const { UserInputError } = ApolloServer

const addSong = async ({ args }) => {

  const audio = await uploadFileFromClient(args.audio)

  if (!isSong({ ...args, audio })) {
    throw new UserInputError("Invalid arguments.")
  }

  const checks = [{
    name: "isUniqueAlbumSong",
    check: sqlQuery({
      query: EXISTS_ALBUM_SONG,
      parse: sqlResExists,
      variables: [{
        key: "title",
        value: args.title,
        parameterized: true,
      },{
        key: "albumId",
        value: args.albumId,
      },{
        string: false,
        key: "discNumber",
        value: args.discNumber,
      },{
        string: false,
        key: "trackNumber",
        value: args.trackNumber,
      }],
    }),
  },{
    name: "doGenresExist",
    check: sqlExists({
      table: "genres",
      column: "genre_id",
      value: args.genreIds,
    }),
  },{
    name: "doesAlbumExist",
    check: sqlExists({
      table: "albums",
      column: "album_id",
      value: args.albumId,
    }),
  },{
    name: "doArtistsExist",
    check: sqlExists({
      table: "artists",
      column: "artist_id",
      value: args.artistIds,
    }),
  },{
    name: "doRemixersExist",
    check: sqlExists({
      table: "artists",
      column: "artist_id",
      value: args.remixerIds,
    }),
  },{
    name: "doFeaturingExist",
    check: sqlExists({
      table: "artists",
      column: "artist_id",
      value: args.featuringIds,
    }),
  }]

  const checksResults = await determineChecksResults(checks)

  if (!checksResults.every(Boolean)) {
    const failedChecks = determineFailedChecks(checks, checksResults)
    throw new UserInputError("Checks failed.", { failedChecks })
  }

  const songId = uuid()
  const duration = Math.ceil(await mp3Duration(audio))

  const songInsert = {
    query: INSERT_SONG,
    parse: sqlParseRow,
    variables: [{
      key: "mix",
      value: args.mix,
      parameterized: true,
    },{
      key: "title",
      value: args.title,
      parameterized: true,
    },{
      key: "songId",
      value: songId,
    },{
      key: "albumId",
      value: args.albumId,
    },{
      string: false,
      key: "duration",
      value: duration,
    },{
      string: false,
      key: "discNumber",
      value: args.discNumber,
    },{
      string: false,
      key: "trackNumber",
      value: args.trackNumber,
    },{
      key: "columnNames",
      value: columnNames.song,
    }],
  }

  const genreInsert = (genreId, index) => ({
    query: INSERT_SONG_GENRE,
    variables: [{
      key: "songId",
      value: songId,
    },{
      key: "genreId",
      value: genreId,
    },{
      value: index,
      key: "index",
      string: false,
    }],
  })

  const artistInsert = (artistId, index) => ({
    query: INSERT_SONG_ARTIST,
    variables: [{
      key: "songId",
      value: songId,
    },{
      key: "artistId",
      value: artistId,
    },{
      key: "index",
      value: index,
      string: false,
    }],
  })

  const remixerInsert = (artistId, index) => ({
    query: INSERT_SONG_REMIXER,
    variables: [{
      key: "songId",
      value: songId,
    },{
      key: "artistId",
      value: artistId,
    },{
      key: "index",
      value: index,
      string: false,
    }],
  })

  const featuringInsert = (artistId, index) => ({
    query: INSERT_SONG_FEAT,
    variables: [{
      key: "songId",
      value: songId,
    },{
      key: "artistId",
      value: artistId,
    },{
      key: "index",
      value: index,
      string: false,
    }],
  })

  const audioUpload =
    s3Upload({
      key: s3CatalogObjectKey({
        id: songId,
        size: "FULL",
        format: "mp3",
      }),
      data: audio,
    })

  const transaction = sqlTransaction([
    songInsert,
    ...args.genreIds.map(genreInsert),
    ...args.artistIds.map(artistInsert),
    ...args.remixerIds.map(remixerInsert),
    ...args.featuringIds.map(featuringInsert),
  ])

  const result = await Promise.all([
    transaction,
    audioUpload,
  ])

  return result[0][0]
}

export default addSong
