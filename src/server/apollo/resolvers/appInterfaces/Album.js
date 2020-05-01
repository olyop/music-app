import {
  SELECT_ALBUM_SONGS,
  SELECT_ALBUM_ARTISTS,
  SELECT_USER_ALBUM_PLAYS,
} from "../../../sql/index.js"

import userDocInLib from "./userDocInLib.js"
import sqlJoin from "../../../helpers/sql/sqlJoin.js"
import columnNames from "../../../sql/columnNames.js"
import userDocDateAdded from "./userDocDateAdded.js"
import sqlQuery from "../../../helpers/sql/sqlQuery.js"
import s3GetObject from "../../../helpers/s3/s3GetObject.js"
import toDataUrl from "../../../helpers/resolver/toDataUrl.js"
import sqlParseTable from "../../../helpers/sql/sqlParseTable.js"
import mapResolver from "../../../helpers/utilities/mapResolver.js"
import s3CatalogObjectKey from "../../../helpers/s3/s3CatalogObjectKey.js"

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

const songs =
  async ({ parent }) =>
    sqlQuery({
      query: SELECT_ALBUM_SONGS,
      parse: sqlParseTable,
      variables: [{
        key: "albumId",
        value: parent.albumId,
      },{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.song),
      }],
    })

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
  })

export default albumResolver
