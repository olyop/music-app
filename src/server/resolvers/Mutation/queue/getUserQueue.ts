import pipe from "@oly_op/pipe"

import {
	SELECT_USER,
	SELECT_USER_QUEUE,
} from "../../../sql"

import { sql } from "../../../helpers"
import { COLUMN_NAMES } from "../../../globals"
import { Queue, Client, User, UserQueue } from "../../../types"

const getUserQueue = (client: Client) => async (userId: string) => {
	const [ prevs, current, nexts, laters ] = await Promise.all([
		sql.baseQuery(client)<UserQueue[]>({
			sql: SELECT_USER_QUEUE,
			parse: sql.parseTable(),
			variables: [{
				key: "userId",
				value: userId,
			},{
				string: false,
				key: "tableName",
				value: "users_prevs",
			},{
				string: false,
				key: "columnNames",
				value: sql.join(COLUMN_NAMES.USER_QUEUE),
			}],
		}),
		sql.baseQuery(client)({
			sql: SELECT_USER,
			parse: pipe(sql.parseRow<User>(), user => user.current),
			variables: [{
				key: "userId",
				value: userId,
			},{
				string: false,
				key: "columnNames",
				value: sql.join(COLUMN_NAMES.USER),
			}],
		}),
		sql.baseQuery(client)<UserQueue[]>({
			sql: SELECT_USER_QUEUE,
			parse: sql.parseTable(),
			variables: [{
				key: "userId",
				value: userId,
			},{
				string: false,
				key: "tableName",
				value: "users_nexts",
			},{
				string: false,
				key: "columnNames",
				value: sql.join(COLUMN_NAMES.USER_QUEUE),
			}],
		}),
		sql.baseQuery(client)<UserQueue[]>({
			sql: SELECT_USER_QUEUE,
			parse: sql.parseTable(),
			variables: [{
				key: "userId",
				value: userId,
			},{
				string: false,
				key: "tableName",
				value: "users_laters",
			},{
				string: false,
				key: "columnNames",
				value: sql.join(COLUMN_NAMES.USER_QUEUE),
			}],
		}),
	])
	return { prevs, current, nexts, laters } as Queue
}

export default getUserQueue