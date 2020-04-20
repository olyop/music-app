import {
  compose,
  resolver,
  toDataUrl,
  parseSqlRow,
  parseSqlTable,
  awsCatalogKey,
  bodyFromAwsRes,
} from "../../helpers/index.js"

import {
  SELECT_ALBUM_SONGS,
  SELECT_ALBUM_ARTISTS,
  SELECT_ALBUM_USER_PLAYS,
  SELECT_ALBUM_USER_ADDED,
  SELECT_ALBUM_USER_IN_LIBRARY,
} from "../../sql/index.js"

import s3 from "../../s3.js"
import { sql } from "../../database/pg.js"
import mapValues from "lodash/mapValues.js"
import { AWS_S3_BUCKET } from "../../globals.js"

const cover = async ({ parent, args }) => compose(
  await s3.getObject({
    Bucket: AWS_S3_BUCKET,
    Key: awsCatalogKey(parent.albumId, args.size),
  }).promise(),
  bodyFromAwsRes,
  toDataUrl,
)

const songs = async ({ parent }) => parseSqlTable(
  await sql(
    SELECT_ALBUM_SONGS,
    { albumId: parent.albumId },
  ),
)

const artists = async ({ parent }) => parseSqlTable(
  await sql(
    SELECT_ALBUM_ARTISTS,
    { albumId: parent.albumId },
  ),
)

const plays = async ({ parent, args }) => parseSqlTable(
  await sql(
    SELECT_ALBUM_USER_PLAYS,
    { albumId: parent.albumId, userId: args.userId },
  ),
)

const dateAdded = async ({ parent, args }) => parseSqlRow(
  await sql(
    SELECT_ALBUM_USER_ADDED,
    { albumId: parent.albumId, userId: args.userId },
  ),
)

const inLibrary = async ({ parent, args }) => parseSqlRow(
  await sql(
    SELECT_ALBUM_USER_IN_LIBRARY,
    { albumId: parent.albumId, userId: args.userId },
  ),
)

const numOfPlays = async ({ parent, args }) => parseSqlTable(
  await sql(
    SELECT_ALBUM_USER_PLAYS,
    { albumId: parent.albumId, userId: args.userId },
  ),
)

const albumResolver = {
  cover,
  songs,
  plays,
  artists,
  dateAdded,
  inLibrary,
  numOfPlays,
}

export default mapValues(albumResolver, resolver)
