import {
  SELECT_GENRE_SONGS,
  SELECT_USER_DOC_PLAYS,
} from "../../sql/index.js"

import sqlJoin from "../../helpers/sql/sqlJoin.js"
import columnNames from "../../sql/columnNames.js"
import userDocInLib from "./common/userDocInLib.js"
import sqlQuery from "../../helpers/sql/sqlQuery.js"
import userDocDateAdded from "./common/userDocDateAdded.js"
import sqlNumOfRows from "../../helpers/sql/sqlNumOfRows.js"
import sqlParseTable from "../../helpers/sql/sqlParseTable.js"
import mapResolver from "../../helpers/utilities/mapResolver.js"

const selectGenreSongs = (parent, parse) =>
  sqlQuery({
    query: SELECT_GENRE_SONGS,
    parse,
    variables: [{
      key: "genreId",
      value: parent.genreId,
    }, {
      string: false,
      key: "columnNames",
      value: sqlJoin(columnNames.song, "songs"),
    }],
  })

const songs = async ({ parent }) =>
  selectGenreSongs(parent, sqlParseTable)

const numOfSongs = async ({ parent }) =>
  selectGenreSongs(parent, sqlNumOfRows)

const plays = async ({ parent, args }) =>
  sqlQuery({
    query: SELECT_USER_DOC_PLAYS,
    parse: sqlParseTable,
    variables: [{
      key: "userId",
      value: args.userId,
    },{
      key: "albumId",
      value: parent.albumId,
    },{
      string: false,
      key: "columnNames",
      value: sqlJoin(columnNames.play),
    }],
  })

const dateAdded =
  userDocDateAdded({
    key: "genreId",
    columnName: "genre_id",
    userDocTable: "users_genres",
  })

const inLibrary =
  userDocInLib({
    key: "genreId",
    columnName: "genre_id",
    userDocTable: "users_genres",
  })

const genreResolver =
  mapResolver({
    songs,
    plays,
    dateAdded,
    inLibrary,
    numOfSongs,
  })

export default genreResolver
