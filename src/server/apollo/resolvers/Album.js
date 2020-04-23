import {
  compose,
  resolver,
  toDataUrl,
  parseSqlRow,
  parseSqlTable,
  awsCatalogKey,
  queryDatabase,
  bodyFromAwsRes,
} from "../../helpers/index.js"

import {
  SELECT_ALBUM_SONGS,
  SELECT_ALBUM_ARTISTS,
  SELECT_ALBUM_USER_PLAYS,
  SELECT_ALBUM_USER_ADDED,
  SELECT_ALBUM_USER_IN_LIB,
} from "../../sql/index.js"

import s3 from "../../aws/s3.js"
import mapValues from "lodash/mapValues.js"
import { AWS_S3_BUCKET } from "../../globals.js"

const cover = async ({ parent, args }) =>
  compose(
    await s3.getObject({
      Bucket: AWS_S3_BUCKET,
      Key: awsCatalogKey(parent.albumId, args.size),
    }).promise(),
    bodyFromAwsRes,
    toDataUrl,
  )

const songs = async ({ parent }) =>
  queryDatabase({
    query: SELECT_ALBUM_SONGS,
    parse: parseSqlTable,
    variables: {
      albumId: parent.albumId,
    },
  })

const artists = async ({ parent }) =>
  queryDatabase({
    query: SELECT_ALBUM_ARTISTS,
    parse: parseSqlTable,
    variables: {
      albumId: parent.albumId,
    },
  })

const plays = async ({ parent, args }) =>
  queryDatabase({
    parse: parseSqlTable,
    query: SELECT_ALBUM_USER_PLAYS,
    variables: {
      userId: args.userId,
      albumId: parent.albumId,
    },
  })

const dateAdded = async ({ parent, args }) =>
  queryDatabase({
    parse: parseSqlRow,
    query: SELECT_ALBUM_USER_ADDED,
    variables: {
      userId: args.userId,
      albumId: parent.albumId,
    },
  })

const inLibrary = async ({ parent, args }) =>
  queryDatabase({
    parse: parseSqlTable,
    query: SELECT_ALBUM_USER_IN_LIB,
    variables: {
      userId: args.userId,
      albumId: parent.albumId,
    },
  })

const numOfPlays = async ({ parent, args }) =>
  queryDatabase({
    query: SELECT_ALBUM_USER_PLAYS,
    parse: res => parseSqlTable(res).length,
    variables: {
      userId: args.userId,
      albumId: parent.albumId,
    },
  })

const albumResolver = mapValues({
  cover,
  songs,
  plays,
  artists,
  dateAdded,
  inLibrary,
  numOfPlays,
}, resolver)

export default albumResolver
