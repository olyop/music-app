import sqlJoin from "../../../helpers/sql/sqlJoin.js"
import columnNames from "../../../sql/columnNames.js"
import sqlQuery from "../../../helpers/sql/sqlQuery.js"
import sqlParseTable from "../../../helpers/sql/sqlParseTable.js"

import { SELECT_USER_DOCS } from "../../../sql/index.js"

const userDocs = ({
  key,
  tableName,
  columnName,
  userTableName,
}) =>
  async ({ parent }) =>
    sqlQuery({
      query: SELECT_USER_DOCS,
      goparse: sqlParseTable,
      variables: [{
        key: "tableName",
        value: tableName,
      },{
        key: "columnName",
        value: columnName,
      },{
        key: "userTableName",
        value: userTableName,
      },{
        key: "userId",
        value: parent.userId,
      },{
        string: false,
        key: "columnNames",
        foo: (() => console.log(key))(),
        value: sqlJoin(columnNames[key]),
      }],
    })

export default userDocs
