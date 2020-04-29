import {
  SELECT_ALBUM_SONGS,
  SELECT_ALBUM_ARTISTS,
  SELECT_USER_ALBUM_PLAYS,
  SELECT_USER_ALBUM_ADDED,
  SELECT_USER_ALBUM_IN_LIB,
} from "../../sql/index.js"

import sqlQuery from "../../helpers/sql/sqlQuery.js"
import s3GetObject from "../../helpers/s3/s3GetObject.js"
import sqlParseRow from "../../helpers/sql/sqlParseRow.js"
import toDataUrl from "../../helpers/resolver/toDataUrl.js"
import sqlParseTable from "../../helpers/sql/sqlParseTable.js"
import mapResolver from "../../helpers/utilities/mapResolver.js"
import s3CatalogObjectKey from "../../helpers/s3/s3CatalogObjectKey.js"

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
    query: SELECT_USER_ALBUM_PLAYS,
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
    query: SELECT_USER_ALBUM_ADDED,
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
    query: SELECT_USER_ALBUM_IN_LIB,
    parse: sqlParseTable,
    variables: [{
      key: "userId",
      value: args.userId,
    },{
      key: "albumId",
      value: parent.albumId,
    }],
  })

const albumResolver =
  mapResolver({
    cover,
    songs,
    plays,
    artists,
    dateAdded,
    inLibrary,
  })

export default albumResolver
