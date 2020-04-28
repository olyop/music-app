import isNull from "lodash/isNull.js"
import isEmpty from "lodash/isEmpty.js"
import flatten from "lodash/flatten.js"
import database from "../../database/index.js"
import pipe from "../../helpers/utilities/pipe.js"
import sqlQuery from "../../helpers/sql/sqlQuery.js"
import s3GetObject from "../../helpers/s3/s3GetObject.js"
import removeDup from "../../helpers/mongodb/removeDup.js"
import toDataUrl from "../../helpers/resolver/toDataUrl.js"
import { playSelect } from "../../helpers/mongodb/select.js"
import sqlParseTable from "../../helpers/sql/sqlParseTable.js"
import mapResolver from "../../helpers/utilities/mapResolver.js"
import s3CatalogObjectKey from "../../helpers/s3/s3CatalogObjectKey.js"
import deserializeDocument from "../../helpers/mongodb/deserializeDocument.js"
import deserializeCollection from "../../helpers/mongodb/deserializeCollection.js"

import { SONG_ARTISTS_FIELDS as fields } from "../../globals/miscellaneous.js"

import {
  SELECT_ARTIST_SONGS,
  SELECT_ARTIST_ALBUMS,
} from "../../sql/index.js"

const { Song, Play, UserArtist } = database.models

const photo = async ({ parent, args }) =>
  s3GetObject({
    parse: toDataUrl,
    key: s3CatalogObjectKey({
      id: parent.artistId,
      size: args.size,
      format: ".jpg",
    }),
  })

const songs = async ({ parent }) =>
  sqlQuery({
    query: SELECT_ARTIST_SONGS,
    parse: sqlParseTable,
    variables: [{
      key: "artistId",
      value: parent.artistId,
    }],
  })

const albums = async ({ parent }) =>
  sqlQuery({
    query: SELECT_ARTIST_ALBUMS,
    parse: sqlParseTable,
    variables: [{
      key: "artistId",
      value: parent.artistId,
    }],
  })

const plays = async ({ parent, args, info }) => {
  const { userId } = args
  const { id: artistId } = parent

  const songsQuery = field =>
    Song.find({ [field]: artistId })
      .select({ _id: 1 })
      .lean()
      .exec()

  const songsQueries = Promise.all(fields.map(songsQuery))

  const ssongs = pipe(await songsQueries)(
    flatten,
    deserializeCollection,
    removeDup,
  )

  const songsId = ssongs.map(({ id }) => id)

  const playQuery =
    Play.find({ user: userId, song: songsId })
      .select(playSelect(info))
      .lean()
      .exec()

  const pplays = deserializeCollection(await playQuery)

  if (isEmpty(pplays)) {
    return null
  } else {
    return plays
  }
}

const dateAdded = async ({ args, parent }) => {
  const { userId } = args
  const { id: artistId } = parent

  const query =
    UserArtist.findOne({ user: userId, artist: artistId })
      .select({ _id: 1 })
      .lean()
      .exec()

  const userArtist = await query

  if (isNull(userArtist)) {
    return null
  } else {
    return deserializeDocument(userArtist).dateCreated
  }
}

const inLibrary = async ({ parent, args }) => {
  const { userId } = args
  const { id: artistId } = parent

  const query =
    UserArtist.findOne({
      user: userId,
      inLibrary: true,
      artist: artistId,
    })
      .select({ inLibrary: 1 })
      .lean()
      .exec()

  const userArtist = await query

  if (isNull(userArtist)) {
    return false
  } else {
    return deserializeDocument(userArtist).inLibrary
  }
}

export default mapResolver({
  photo,
  songs,
  plays,
  albums,
  dateAdded,
  inLibrary,
})
