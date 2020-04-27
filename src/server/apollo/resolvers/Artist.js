import isNull from "lodash/isNull.js"
import isEmpty from "lodash/isEmpty.js"
import flatten from "lodash/flatten.js"
import mapValues from "lodash/mapValues.js"
import database from "../../database/index.js"
import sqlQuery from "../../helpers/sql/sqlQuery.js"
import s3GetObject from "../../helpers/s3/s3GetObject.js"
import resolver from "../../helpers/utilities/resolver.js"
import toDataUrl from "../../helpers/resolver/toDataUrl.js"
import sqlParseTable from "../../helpers/sql/sqlParseTable.js"
import s3CatalogObjectKey from "../../helpers/s3/s3CatalogObjectKey.js"
import deserializeDocument from "../../helpers/mongodb/deserializeDocument.js"
import deserializeCollection from "../../helpers/mongodb/deserializeCollection.js"

import { SELECT_ARTIST_SONGS } from "../../sql/index.js"
import { SONG_ARTISTS_FIELDS as fields } from "../../globals/miscellaneous.js"

const { Song, Play, Album, UserArtist } = database.models

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
    parse: sqlParseTable,
    query: SELECT_ARTIST_SONGS,
    variables: [{
      key: "artistId",
      value: parent.artistId,
    }],
  })

const albums = async ({ parent, info }) => {
  const { id: artistId } = parent

  const query =
    Album.find({ artists: artistId })
      .select(albumSelect(info))
      .lean()
      .exec()

  return deserializeCollection(await query)
}

const plays = async ({ parent, args, info }) => {
  const { userId } = args
  const { id: artistId } = parent

  const songsQuery = field =>
    Song.find({ [field]: artistId })
      .select({ _id: 1 })
      .lean()
      .exec()

  const songsQueries = Promise.all(fields.map(songsQuery))

  const _songs = pipe(await songsQueries)(
    flatten,
    deserializeCollection,
    removeDup,
  )

  const songsId = _songs.map(({ id }) => id)

  const playQuery =
    Play.find({ user: userId, song: songsId })
      .select(playSelect(info))
      .lean()
      .exec()

  const _plays = deserializeCollection(await playQuery)

  if (isEmpty(_plays)) {
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

const numOfPlays = async ({ parent, args, info }) => {
  const { userId } = args
  const { id: artistId } = parent

  const songsQuery =
    Song.find({ artist: artistId })
      .select({ _id: 1 })
      .lean()
      .exec()

  const _songs = deserializeCollection(await songsQuery)
  const songsId = _songs.map(({ id }) => id)

  const playQuery =
    Play.find({ user: userId, song: songsId })
      .select(playSelect(info))
      .lean()
      .exec()

  const _plays = deserializeCollection(await playQuery)

  if (isEmpty(_plays)) {
    return null
  } else {
    return _plays.length
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

const artistResolver = mapValues({
  photo,
  songs,
  plays,
  albums,
  dateAdded,
  inLibrary,
  numOfPlays,
}, resolver)

export default artistResolver
