import uuid from "uuid"
import ApolloServer from "apollo-server-express"
import now from "../../../helpers/utilities/now.js"
import sqlQuery from "../../../helpers/sql/sqlQuery.js"
import isUser from "../../../helpers/validators/isUser.js"
import sqlParseRow from "../../../helpers/sql/sqlParseRow.js"

import { INSERT_USER } from "../../../sql/index.js"

const { UserInputError } = ApolloServer

const addUser = async ({ args }) => {

  if (!isUser(args)) {
    throw new UserInputError("Invalid arguments.")
  }

  const insert =
    sqlQuery({
      query: INSERT_USER,
      parse: sqlParseRow,
      variables: [{
        key: "userId",
        value: uuid.v4(),
      },{
        key: "name",
        value: args.name,
        parameterized: true,
      },{
        key: "email",
        value: args.email,
        parameterized: true,
      },{
        key: "dateCreated",
        value: now(),
      }],
    })

  return insert
}

export default addUser
