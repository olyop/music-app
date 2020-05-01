import {
  EXISTS_USER_DOC,
  INSERT_USER_DOC,
  UPDATE_USER_DOC_IN_LIB,
} from "../../../../sql/index.js"

import columnNames from "../../../../sql/columnNames.js"
import sqlQuery from "../../../../helpers/sql/sqlQuery.js"
import sqlParseRow from "../../../../helpers/sql/sqlParseRow.js"
import sqlResExists from "../../../../helpers/sql/sqlResExists.js"

const addUserDoc = ({
  key,
  returnSql,
  columnName,
  docTableName,
  userTableName,
}) => async ({
  args,
}) => {

  const variables = [{
    key: "docId",
    value: args[key],
  },{
    key: "userId",
    value: args.userId,
  },{
    key: "tableName",
    value: userTableName,
  },{
    key: "columnKey",
    value: columnName,
  }]

  const doesUserDocExist =
    await sqlQuery({
      query: EXISTS_USER_DOC,
      parse: sqlResExists,
      variables,
    })

  const updateUserDocInLib =
    sqlQuery({
      query: UPDATE_USER_DOC_IN_LIB,
      parse: sqlParseRow,
      variables,
    })

  const insertUserDoc =
    sqlQuery({
      query: INSERT_USER_DOC,
      parse: sqlParseRow,
      variables,
    })

  const actionQuery =
    doesUserDocExist ? updateUserDocInLib : insertUserDoc

  const returnQuery =
    sqlQuery({
      query: returnSql,
      parse: sqlParseRow,
      variables: [{
        key: "docId",
        value: args[key],
      }, {
        key: "columnNames",
        value: columnNames[docTableName],
      }],
    })

  const result = Promise.all([ returnQuery, actionQuery ])

  return result[0]
}

export default addUserDoc
