import { UPDATE_USER_SONG_LATER } from "../../../sql/index.js"

import sqlQuery from "../../../helpers/sql/sqlQuery.js"
import sqlParseRow from "../../../helpers/sql/sqlParseRow.js"

const userAddSongNext =
  async () =>
    sqlQuery({
      query: UPDATE_USER_SONG_LATER,
      parse: sqlParseRow,
    })

export default userAddSongNext
