import {
  SELECT_USER,
  SELECT_SONG,
} from "../../sql/index.js"

import sqlQuery from "../../helpers/sql/sqlQuery.js"
import sqlParseRow from "../../helpers/sql/sqlParseRow.js"
import mapResolver from "../../helpers/utils/mapResolver.js"

const user = async ({ parent }) =>
  sqlQuery({
    query: SELECT_USER,
    parse: sqlParseRow,
    variables: [{
      key: "userId",
      value: parent.userId,
    }],
  })

const song = async ({ parent }) =>
  sqlQuery({
    query: SELECT_SONG,
    parse: sqlParseRow,
    variables: [{
      key: "songId",
      value: parent.songId,
    }],
  })

const playResolver =
  mapResolver({
    user,
    song,
  })

export default playResolver
