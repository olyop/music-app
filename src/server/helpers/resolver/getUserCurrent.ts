import pipe from "@oly_op/pipe"
import { join, query, parseRow, Client } from "@oly_op/pg-helpers"

import { User } from "../../types"
import { SELECT_USER } from "../../sql"
import { COLUMN_NAMES } from "../../globals"

export const getUserCurrent =
	(client: Client) => (userId: string) =>
		query(client)({
			sql: SELECT_USER,
			parse: pipe(parseRow<User>(), ({ current }) => current),
			variables: [{
				key: "userId",
				value: userId,
			},{
				string: false,
				key: "columnNames",
				value: join(COLUMN_NAMES.USER),
			}],
		})