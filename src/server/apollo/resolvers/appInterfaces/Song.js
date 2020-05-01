import {
  SELECT_ALBUM,
  SELECT_SONG_GENRES,
  SELECT_SONG_ARTISTS,
  SELECT_SONG_REMIXERS,
  SELECT_SONG_FEATURING,
  SELECT_USER_DOC_PLAYS,
  SELECT_USER_IS_CURRENT,
} from "../../../sql/index.js"

import userDocInLib from "./userDocInLib.js"
import userDocDateAdded from "./userDocDateAdded.js"
import sqlJoin from "../../../helpers/sql/sqlJoin.js"
import columnNames from "../../../sql/columnNames.js"
import sqlQuery from "../../../helpers/sql/sqlQuery.js"
import sqlParseRow from "../../../helpers/sql/sqlParseRow.js"
import sqlParseTable from "../../../helpers/sql/sqlParseTable.js"
import mapResolver from "../../../helpers/utilities/mapResolver.js"

const album =
  async ({ parent }) =>
    sqlQuery({
      query: SELECT_ALBUM,
      parse: sqlParseRow,
      variables: [{
        key: "albumId",
        value: parent.albumId,
      },{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.album),
      }],
    })

const genres =
  async ({ parent }) =>
    sqlQuery({
      query: SELECT_SONG_GENRES,
      parse: sqlParseTable,
      variables: [{
        key: "songId",
        value: parent.songId,
      },{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.genre, "genres"),
      }],
    })

const artists =
  async ({ parent }) =>
    sqlQuery({
      query: SELECT_SONG_ARTISTS,
      parse: sqlParseTable,
      variables: [{
        key: "songId",
        value: parent.songId,
      },{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.artist, "artists"),
      }],
    })

const remixers =
  async ({ parent }) =>
    sqlQuery({
      query: SELECT_SONG_REMIXERS,
      parse: sqlParseTable,
      variables: [{
        key: "songId",
        value: parent.songId,
      },{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.artist, "artists"),
      }],
    })

const featuring =
  async ({ parent }) =>
    sqlQuery({
      query: SELECT_SONG_FEATURING,
      parse: sqlParseTable,
      variables: [{
        key: "songId",
        value: parent.songId,
      },{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.artist, "artists"),
      }],
    })

const plays =
  async ({ parent, args }) =>
    sqlQuery({
      query: SELECT_USER_DOC_PLAYS,
      parse: sqlParseTable,
      variables: [{
        key: "songId",
        value: parent.songId,
      },{
        key: "userId",
        value: args.userId,
      }],
    })

const isCurrent =
  async ({ parent, args }) =>
    sqlQuery({
      query: SELECT_USER_IS_CURRENT,
      parse: sqlParseTable,
      variables: [{
        key: "songId",
        value: parent.songId,
      },{
        key: "userId",
        value: args.userId,
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

const songResolver =
  mapResolver({
    album,
    genres,
    artists,
    remixers,
    featuring,
    plays,
    dateAdded,
    inLibrary,
    isCurrent,
  })

export default songResolver
