import {
  SELECT_SONG,
  SELECT_SONGS_IN,
  SELECT_USER_PLAYS,
} from "../../sql/index.js"

import isNull from "lodash/isNull.js"
import userDocs from "./common/userDocs.js"
import columnNames from "../../sql/columnNames.js"
import sqlJoin from "../../helpers/sql/sqlJoin.js"
import sqlQuery from "../../helpers/sql/sqlQuery.js"
import sqlParseRow from "../../helpers/sql/sqlParseRow.js"
import mapResolver from "../../helpers/utilities/mapResolver.js"
import sqlParseTable from "../../helpers/sql/sqlParseTable.js"

const current =
  async ({ parent }) =>
    (isNull(parent.current) ? null : (
      sqlQuery({
        query: SELECT_SONG,
        parse: sqlParseRow,
        variables: [{
          key: "songId",
          value: parent.current,
        },{
          string: false,
          key: "columnNames",
          value: sqlJoin(columnNames.song),
        }],
      })))

const prev =
  async ({ parent }) =>
    sqlQuery({
      query: SELECT_SONGS_IN,
      parse: sqlParseTable,
      variables: [{
        key: "userId",
        value: parent.userId,
      },{
        string: false,
        key: "tableName",
        value: "users_prevs",
      },{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.song),
      }],
    })

const next =
  async ({ parent }) =>
    sqlQuery({
      query: SELECT_SONGS_IN,
      parse: sqlParseTable,
      variables: [{
        key: "userId",
        value: parent.userId,
      },{
        string: false,
        key: "tableName",
        value: "users_nexts",
      },{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.song),
      }],
    })

const queue =
  async ({ parent }) =>
    sqlQuery({
      query: SELECT_SONGS_IN,
      parse: sqlParseTable,
      variables: [{
        key: "userId",
        value: parent.userId,
      },{
        string: false,
        key: "tableName",
        value: "users_queues",
      },{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.song),
      }],
    })

const plays =
  async ({ parent }) =>
    sqlQuery({
      query: SELECT_USER_PLAYS,
      parse: sqlParseTable,
      variables: [{
        key: "userId",
        value: parent.userId,
      }],
    })

const songs =
  userDocs({
    key: "",
    tableName: "",
    columnName: "",
    userTableName: "",
  })

const genres =
  userDocs({
    key: "",
    tableName: "",
    columnName: "",
    userTableName: "",
  })

const albums =
  userDocs({
    key: "",
    tableName: "",
    columnName: "",
    userTableName: "",
  })

const artists =
  userDocs({
    key: "",
    tableName: "",
    columnName: "",
    userTableName: "",
  })

const playlists =
  userDocs({
    key: "",
    tableName: "",
    columnName: "",
    userTableName: "",
  })

const userResolver =
  mapResolver({
    current,
    prev,
    next,
    queue,
    plays,
    songs,
    genres,
    albums,
    artists,
    playlists,
  })

export default userResolver
