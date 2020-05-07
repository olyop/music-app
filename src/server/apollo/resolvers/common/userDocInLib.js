import sqlQuery from "../../../helpers/sql/sqlQuery.js"

import { SELECT_USER_DOC_IN_LIB } from "../../../sql/index.js"

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
      string: false,
      key: "columnName",
      value: columnName,
    },{
      string: false,
      key: "tableName",
      value: userDocTable,
    }],
  })

export default userDocInLib
