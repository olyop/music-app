import { UPDATE_USER_SONG_LATER } from "../../../sql"
import sqlQuery from "../../../helpers/sql/sqlQuery.js"
import sqlParseRow from "../../../helpers/sql/sqlParseRow.js"

export const userAddSongLater =
  async () =>
    sqlQuery({
      sql: UPDATE_USER_SONG_LATER,
      parse: sqlParseRow,
    })