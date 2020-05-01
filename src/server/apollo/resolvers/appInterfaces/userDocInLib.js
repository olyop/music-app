import { SELECT_USER_DOC_IN_LIB } from "../../../sql/index.js"

import sqlQuery from "../../../helpers/sql/sqlQuery.js"

const userDocInLib = ({
  key,
  columnName,
  userDocTable,
}) => async ({
  parent,
  args,
}) =>
  sqlQuery({
    query: SELECT_USER_DOC_IN_LIB,
    parse: ({ rows }) => rows[0].exists,
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

export default userDocInLib
