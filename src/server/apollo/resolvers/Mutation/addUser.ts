import { v4 as uuid } from "uuid"
import { UserInputError } from "apollo-server-express"

import { User } from "../../../types"
import { INSERT_USER } from "../../../sql"
import { COLUMN_NAMES } from "../../../globals"
import { sql, isUser, createResolver } from "../../../helpers"

type Args = {
	name: string,
	email: string,
}

const resolver =
	createResolver()

export const addUser =
	resolver<User, Args>(
		({ args }) => {
			if (!isUser(args)) {
				throw new UserInputError("Invalid arguments.")
			} else {
				return sql.query({
					sql: INSERT_USER,
					parse: res => sql.parseRow(res),
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
					},{
						key: "columnNames",
						value: sql.join(COLUMN_NAMES.USER),
					}],
				})
			}
		},
	)