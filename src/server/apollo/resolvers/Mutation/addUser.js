import uuid from "uuid"
import sqlQuery from "../../../helpers/sql/sqlQuery.js"
import ApolloServerExpress from "apollo-server-express"
import isUser from "../../../helpers/validators/isUser.js"
import sqlParseRow from "../../../helpers/sql/sqlParseRow.js"
import resolver from "../../../helpers/utilities/resolver.js"

import { INSERT_USER } from "../../../sql/index.js"

const { UserInputError } = ApolloServerExpress

const addUser = async ({ args }) => {

  if (!isUser(args)) {
    throw new UserInputError("Invalid arguments.")
  }

  const userInsert =
    sqlQuery({
      query: INSERT_USER,
      parse: sqlParseRow,
      variables: [{
        key: "name",
        value: args.name,
        parameterized: true,
      },{
        key: "email",
        value: args.email,
        parameterized: true,
      },{
        key: "userId",
        value: uuid.v4(),
      }],
    })

  return userInsert
}

export default resolver(addUser)
