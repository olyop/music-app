import head from "lodash/head.js"
import identity from "lodash/identity.js"
import sqlJoin from "../../../helpers/sql/sqlJoin.js"
import columnNames from "../../../sql/columnNames.js"
import compose from "../../../helpers/utils/compose.js"
import sqlQuery from "../../../helpers/sql/sqlQuery.js"
import sqlParseTable from "../../../helpers/sql/sqlParseTable.js"

import { SELECT_SEARCH } from "../../../sql/index.js"

const docSearch = (tableName, docName, columnName, exact) => query =>
  sqlQuery({
    query: SELECT_SEARCH,
    parse: compose(sqlParseTable, exact ? head : identity),
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
