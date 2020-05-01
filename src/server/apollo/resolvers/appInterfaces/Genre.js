import {
  SELECT_GENRE_SONGS,
  SELECT_USER_DOC_PLAYS,
} from "../../../sql/index.js"

import userDocInLib from "./userDocInLib.js"
import userDocDateAdded from "./userDocDateAdded.js"
import sqlJoin from "../../../helpers/sql/sqlJoin.js"
import columnNames from "../../../sql/columnNames.js"
import sqlQuery from "../../../helpers/sql/sqlQuery.js"
import sqlParseTable from "../../../helpers/sql/sqlParseTable.js"
import mapResolver from "../../../helpers/utilities/mapResolver.js"

const songs = async ({ parent }) =>
  sqlQuery({
    query: SELECT_GENRE_SONGS,
    parse: sqlParseTable,
    variables: [{
      key: "genreId",
      value: parent.genreId,
    },{
      string: false,
      key: "columnNames",
      value: sqlJoin(columnNames.song, "songs"),
    }],
  })

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
    key: "albumId",
    columnName: "album_id",
    userDocTable: "users_genres",
  })

const genreResolver =
  mapResolver({
    songs,
    plays,
    dateAdded,
    inLibrary,
  })

export default genreResolver
