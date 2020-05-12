import { UPDATE_USER_PLAY } from "../../../sql/index.js"

import columnNames from "../../../sql/columnNames.js"
import sqlJoin from "../../../helpers/sql/sqlJoin.js"
import sqlQuery from "../../../helpers/sql/sqlQuery.js"
import sqlParseRow from "../../../helpers/sql/sqlParseRow.js"

const userPlay =
  async ({ args }) =>
    sqlQuery({
      query: UPDATE_USER_PLAY,
      parse: sqlParseRow,
      variables: [{
        key: "userId",
        value: args.userId,
      },{
        key: "songId",
        value: args.songId,
      },{
        string: false,
        key: "columnNames",
        value: sqlJoin(columnNames.user),
      }],
    })

export default userPlay
