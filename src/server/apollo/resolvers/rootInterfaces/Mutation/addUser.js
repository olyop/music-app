import { v4 as uuid } from "uuid"
import ApolloServer from "apollo-server-express"
import sqlQuery from "../../../../helpers/sql/sqlQuery.js"
import isUser from "../../../../helpers/validators/isUser.js"
import sqlParseRow from "../../../../helpers/sql/sqlParseRow.js"

import { INSERT_USER } from "../../../../sql/index.js"

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
        value: uuid(),
      },{
        key: "name",
        value: args.name,
        parameterized: true,
      },{
        key: "email",
        value: args.email,
        parameterized: true,
      }],
    })

  return insert
}

export default addUser
