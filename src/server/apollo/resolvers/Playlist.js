import {
  SELECT_USER,
  SELECT_PLAYLIST_SONGS,
  SELECT_USER_DOC_PLAYS,
} from "../../sql/index.js"

import sqlJoin from "../../helpers/sql/sqlJoin.js"
import columnNames from "../../sql/columnNames.js"
import userDocInLib from "./common/userDocInLib.js"
import sqlQuery from "../../helpers/sql/sqlQuery.js"
import sqlParseRow from "../../helpers/sql/sqlParseRow.js"
import userDocDateAdded from "./common/userDocDateAdded.js"
import mapResolver from "../../helpers/utils/mapResolver.js"

const user = async ({ parent }) =>
  sqlQuery({
    sqlQuery: SELECT_USER,
    parse: sqlParseRow,
    variables: [{
      key: "userId",
      value: parent.userId,
    },{
      string: false,
      key: "columnNames",
      value: sqlJoin(columnNames.user),
    }],
  })

const songs = async ({ parent }) =>
  sqlQuery({
    query: SELECT_PLAYLIST_SONGS,
    parse: sqlParseRow,
    variables: [{
      key: "playlistId",
      value: parent.playlistId,
    },{
      string: false,
      key: "columnNames",
      value: sqlJoin(columnNames.songs),
    }],
  })

const plays = async ({ parent, args }) =>
  sqlQuery({
    query: SELECT_USER_DOC_PLAYS,
    parse: sqlParseRow,
    variables: [{
      key: "userId",
      value: args.userId,
    },{
      key: "playlistId",
      value: parent.playlistId,
    },{
      string: false,
      key: "columnNames",
      value: sqlJoin(columnNames.plays),
    }],
  })

const dateAdded =
  userDocDateAdded({
    key: "playlistId",
    columnName: "playlist_id",
    userDocTable: "users_playlists",
  })

const inLibrary =
  userDocInLib({
    key: "playlistId",
    columnName: "playlist_id",
    userDocTable: "users_playlists",
  })

const playlistResolver =
  mapResolver({
    user,
    songs,
    plays,
    dateAdded,
    inLibrary,
  })

export default playlistResolver
