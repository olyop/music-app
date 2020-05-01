import { UPDATE_USER_SONG_NEXT } from "../../../../sql/index.js"

import sqlQuery from "../../../../helpers/sql/sqlQuery.js"
import sqlParseRow from "../../../../helpers/sql/sqlParseRow.js"

const userAddSongNext =
  async () =>
    sqlQuery({
      query: UPDATE_USER_SONG_NEXT,
      parse: sqlParseRow,
    })

export default userAddSongNext
