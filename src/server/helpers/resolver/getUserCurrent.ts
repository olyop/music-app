import pipe from "@oly_op/pipe"

import { SELECT_USER } from "../../sql"
import { sqlJoin } from "../sql/sqlJoin"
import { sqlQuery } from "../sql/sqlQuery"
import { PGClient, User } from "../../types"
import { COLUMN_NAMES } from "../../globals"
import { parseSqlRow } from "../sql/parseSqlRow"

export const getUserCurrent =
	(client: PGClient) => (userId: string) =>
		sqlQuery(client)({
			sql: SELECT_USER,
			parse: pipe(parseSqlRow<User>(), ({ current }) => current),
			variables: [{
				key: "userId",
				value: userId,
			},{
				string: false,
				key: "columnNames",
				value: sqlJoin(COLUMN_NAMES.USER),
			}],
		})