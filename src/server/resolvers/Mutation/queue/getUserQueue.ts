import pipe from "@oly_op/pipe"

import {
	sqlJoin,
	sqlQuery,
	parseSqlRow,
	parseSqlTable,
} from "../../../helpers"

import {
	SELECT_USER,
	SELECT_USER_QUEUE,
} from "../../../sql"

import { COLUMN_NAMES } from "../../../globals"
import { Queue, Client, User, UserQueue } from "../../../types"

const getUserQueue = (client: Client) => async (userId: string) => {
	const [ prevs, current, nexts, laters ] = await Promise.all([
		sqlQuery(client)<UserQueue[]>({
			sql: SELECT_USER_QUEUE,
			parse: parseSqlTable(),
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
				value: sqlJoin(COLUMN_NAMES.USER_QUEUE),
			}],
		}),
		sqlQuery(client)({
			sql: SELECT_USER,
			parse: pipe(parseSqlRow<User>(), user => user.current),
			variables: [{
				key: "userId",
				value: userId,
			},{
				string: false,
				key: "columnNames",
				value: sqlJoin(COLUMN_NAMES.USER),
			}],
		}),
		sqlQuery(client)<UserQueue[]>({
			sql: SELECT_USER_QUEUE,
			parse: parseSqlTable(),
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
				value: sqlJoin(COLUMN_NAMES.USER_QUEUE),
			}],
		}),
		sqlQuery(client)<UserQueue[]>({
			sql: SELECT_USER_QUEUE,
			parse: parseSqlTable(),
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
				value: sqlJoin(COLUMN_NAMES.USER_QUEUE),
			}],
		}),
	])
	return { prevs, current, nexts, laters } as Queue
}

export default getUserQueue