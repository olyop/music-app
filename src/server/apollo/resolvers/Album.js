import mapValues from "lodash/mapValues.js"
import sqlQuery from "../../helpers/sql/sqlQuery.js"
import s3GetObject from "../../helpers/s3/s3GetObject.js"
import resolver from "../../helpers/utilities/resolver.js"
import sqlParseRow from "../../helpers/sql/sqlParseRow.js"
import toDataUrl from "../../helpers/resolver/toDataUrl.js"
import sqlParseTable from "../../helpers/sql/sqlParseTable.js"
import s3CatalogObjectKey from "../../helpers/s3/s3CatalogObjectKey.js"

import {
  SELECT_ALBUM_SONGS,
  SELECT_ALBUM_ARTISTS,
  SELECT_ALBUM_USER_PLAYS,
  SELECT_ALBUM_USER_ADDED,
  SELECT_ALBUM_USER_IN_LIB,
} from "../../sql/index.js"

const cover = async ({ parent, args }) =>
  s3GetObject({
    parse: toDataUrl,
    key: s3CatalogObjectKey({
      id: parent.albumId,
      size: args.size,
      format: ".jpg",
    }),
  })

const songs = async ({ parent }) =>
  sqlQuery({
    query: SELECT_ALBUM_SONGS,
    parse: sqlParseTable,
    variables: [{
      key: "albumId",
      value: parent.albumId,
    }],
  })

const artists = async ({ parent }) =>
  sqlQuery({
    query: SELECT_ALBUM_ARTISTS,
    parse: sqlParseTable,
    variables: [{
      key: "albumId",
      value: parent.albumId,
    }],
  })

const plays = async ({ parent, args }) =>
  sqlQuery({
    query: SELECT_ALBUM_USER_PLAYS,
    parse: sqlParseTable,
    variables: [{
      key: "userId",
      value: args.userId,
    },{
      key: "albumId",
      value: parent.albumId,
    }],
  })

const dateAdded = async ({ parent, args }) =>
  sqlQuery({
    query: SELECT_ALBUM_USER_ADDED,
    parse: sqlParseRow,
    variables: [{
      key: "userId",
      value: args.userId,
    },{
      key: "albumId",
      value: parent.albumId,
    }],
  })

const inLibrary = async ({ parent, args }) =>
  sqlQuery({
    query: SELECT_ALBUM_USER_IN_LIB,
    parse: sqlParseTable,
    variables: [{
      key: "userId",
      value: args.userId,
    },{
      key: "albumId",
      value: parent.albumId,
    }],
  })

const numOfPlays = async ({ parent, args }) =>
  sqlQuery({
    query: SELECT_ALBUM_USER_PLAYS,
    parse: res => sqlParseTable(res).length,
    variables: [{
      key: "userId",
      value: args.userId,
    },{
      key: "albumId",
      value: parent.albumId,
    }],
  })

const albumResolver = mapValues(
  {
    cover,
    songs,
    plays,
    artists,
    dateAdded,
    inLibrary,
    numOfPlays,
  },
  resolver,
)

export default albumResolver
