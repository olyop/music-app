import { DELETE_USER_DOC } from "../../../sql/index.js"

import columnNames from "../../../sql/columnNames.js"
import sqlQuery from "../../../helpers/sql/sqlQuery.js"
import sqlParseRow from "../../../helpers/sql/sqlParseRow.js"

const addUserDoc = ({
  key,
  returnSql,
  columnName,
  docTableName,
  userTableName,
}) => async ({
  args,
}) => {

  const deleteUserDoc =
    sqlQuery({
      query: DELETE_USER_DOC,
      parse: sqlParseRow,
      variables: [{
        key: "docId",
        value: args[key],
      },{
        key: "userId",
        value: args.userId,
      },{
        key: "columnKey",
        value: columnName,
      },{
        key: "tableName",
        value: userTableName,
      }],
    })

  const returnQuery =
    sqlQuery({
      query: returnSql,
      parse: sqlParseRow,
      variables: [{
        key: "docId",
        value: args[key],
      },{
        key: "columnNames",
        value: columnNames[docTableName],
      }],
    })

  const result = Promise.all([ returnQuery, deleteUserDoc ])

  return result[0]
}

export default addUserDoc
