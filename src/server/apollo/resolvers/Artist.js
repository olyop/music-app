import s3 from "../../aws/s3.js"
import isNull from "lodash/isNull.js"
import isEmpty from "lodash/isEmpty.js"
import flatten from "lodash/flatten.js"
import mapValues from "lodash/mapValues.js"
import database from "../../database/index.js"

import {
  pipe,
  removeDup,
  compose,
  resolver,
  toDataUrl,
  parseSqlTable,
  queryDatabase,
  albumSelect,
  playSelect,
  awsCatalogKey,
  bodyFromAwsRes,
  deserializeDocument,
  deserializeCollection,
} from "../../helpers/index.js"

import {
  AWS_S3_BUCKET,
  SONG_ARTISTS_FIELDS as fields,
} from "../../globals.js"

import {
  SELECT_ARTIST_SONGS,
} from "../../sql/index.js"

const {
  Song,
  Play,
  Album,
  UserArtist,
} = database.models

const photo = async ({ parent, args }) =>
  compose(
    await s3.getObject({
      Bucket: AWS_S3_BUCKET,
      Key: awsCatalogKey(parent.artistId, args.size),
    }).promise(),
    bodyFromAwsRes,
    toDataUrl,
  )

const songs = async ({ parent }) =>
  queryDatabase({
    parse: parseSqlTable,
    query: SELECT_ARTIST_SONGS,
    args: { artistId: parent.artistId },
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
