import sqlJoin from "../../../helpers/sql/sqlJoin.js"
import columnNames from "../../../sql/columnNames.js"
import sqlQuery from "../../../helpers/sql/sqlQuery.js"
import sqlParseTable from "../../../helpers/sql/sqlParseTable.js"

import { SELECT_SEARCH } from "../../../sql/index.js"

const docSearch = (tableName, docName, columnName) => query =>
  sqlQuery({
    query: SELECT_SEARCH,
    parse: sqlParseTable,
    variables: [{
      string: false,
      key: "tableName",
      value: tableName,
    },{
      string: false,
      key: "columnName",
      value: columnName,
    },{
      key: "query",
      parameterized: true,
      value: `%${query.toLowerCase()}%`,
    },{
      string: false,
      key: "columnNames",
      value: sqlJoin(columnNames[docName]),
    }],
  })

export default docSearch
