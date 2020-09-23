import {
	SELECT_USER,
	SELECT_USER_QUEUE,
} from "../../sql"

import { sql } from "../../helpers"
import { COLUMN_NAMES } from "../../globals"
import { Client, User, UserQueue } from "../../types"

const getUserQueue = (client: Client) => async (userId: string) =>
	Promise.all([
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
		sql.baseQuery(client)<User>({
			sql: SELECT_USER,
			parse: sql.parseRow(),
			variables: [{
				key: "userId",
				value: userId,
			},{
				string: false,
				key: "columnNames",
				value: sql.join(COLUMN_NAMES.USER),
			}],
		}),
	])

export default getUserQueue