import { SELECT_USER_DOC_ADDED } from "../../../sql/index.js"

import sqlQuery from "../../../helpers/sql/sqlQuery.js"
import sqlParseRow from "../../../helpers/sql/sqlParseRow.js"

const userDocDateAdded = ({
  key,
  columnName,
  userDocTable,
}) => async ({
  parent,
  args,
}) =>
  sqlQuery({
    query: SELECT_USER_DOC_ADDED,
    parse: res => sqlParseRow(res).dateCreated,
    variables: [{
      key: "userId",
      value: args.userId,
    },{
      key: "docId",
      value: parent[key],
    },{
      key: "columnName",
      value: columnName,
    },{
      key: "tableName",
      value: userDocTable,
    }],
  })

export default userDocDateAdded
