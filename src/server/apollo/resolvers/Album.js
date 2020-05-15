import {
  SELECT_ALBUM_SONGS,
  SELECT_ALBUM_ARTISTS,
  SELECT_USER_ALBUM_PLAYS,
} from "../../sql/index.js"

import sqlJoin from "../../helpers/sql/sqlJoin.js"
import columnNames from "../../sql/columnNames.js"
import userDocInLib from "./common/userDocInLib.js"
import sqlQuery from "../../helpers/sql/sqlQuery.js"
import s3GetObject from "../../helpers/s3/s3GetObject.js"
import userDocDateAdded from "./common/userDocDateAdded.js"
import toDataUrl from "../../helpers/resolver/toDataUrl.js"
import sqlParseTable from "../../helpers/sql/sqlParseTable.js"
import mapResolver from "../../helpers/utils/mapResolver.js"
import s3CatalogObjectKey from "../../helpers/s3/s3CatalogObjectKey.js"
import sqlTransaction from "../../helpers/sql/sqlTransaction.js"

const cover =
  async ({ parent, args }) =>
    s3GetObject({
      parse: toDataUrl,
      key: s3CatalogObjectKey({
        id: parent.albumId,
        size: args.size,
        format: "jpg",
      }),
    })

const getAlbumSongs = (parent, parse) =>
  sqlQuery({
    query: SELECT_ALBUM_SONGS,
    parse,
    variables: [{
      key: "albumId",
      value: parent.albumId,
    },{
      string: false,
      key: "columnNames",
      value: sqlJoin(columnNames.song),
    }],
  })

const songs =
  async ({ parent }) =>
    getAlbumSongs(parent, sqlParseTable)

const totalDuration =
  async ({ parent }) =>
    getAlbumSongs(parent, ({ rows }) =>
      rows
        .map(({ duration }) => duration)
        .reduce((total, duration) => total + duration, 0))

const artists =
  async ({ parent }) =>
    sqlQuery({
      query: SELECT_ALBUM_ARTISTS,
      parse: sqlParseTable,
      variables: [{
        key: "albumId",
        value: parent.albumId,
      },{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.artist, "artists"),
      }],
    })

const plays =
  async ({ parent, args }) =>
    sqlQuery({
      query: SELECT_USER_ALBUM_PLAYS,
      parse: sqlParseTable,
      variables: [{
        key: "userId",
        value: args.userId,
      },{
        key: "docId",
        value: parent.albumId,
      },{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.plays),
      }],
    })

const dateAdded =
  userDocDateAdded({
    key: "albumId",
    columnName: "album_id",
    userDocTable: "users_albums",
  })

const inLibrary =
  userDocInLib({
    key: "albumId",
    columnName: "album_id",
    userDocTable: "users_albums",
  })

const albumResolver =
  mapResolver({
    cover,
    songs,
    plays,
    artists,
    dateAdded,
    inLibrary,
    totalDuration,
  })

export default albumResolver
