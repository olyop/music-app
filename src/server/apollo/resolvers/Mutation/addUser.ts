import { v4 as uuid } from "uuid"
import { UserInputError } from "apollo-server-express"

import sqlQuery from "../../../helpers/sql/sqlQuery.js"
import isUser from "../../../helpers/validators/isUser.js"
import sqlParseRow from "../../../helpers/sql/sqlParseRow.js"

import { INSERT_USER } from "../../../sql"

export const addUser = async ({ args }) => {
	if (!isUser(args)) {
		throw new UserInputError("Invalid arguments.")
	} else {
		return sqlQuery({
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
	}
}