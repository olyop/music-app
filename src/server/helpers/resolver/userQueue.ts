import {
	PGClient,
	UserQueue,
	UserQueues,
	GetUserQueueInput,
} from "../../types"

import {
	SELECT_USER_QUEUE_SONGS,
} from "../../sql"

import { sqlJoin } from "../sql/sqlJoin"
import { sqlQuery } from "../sql/sqlQuery"
import { COLUMN_NAMES } from "../../globals"
import { getUserCurrent } from "./getUserCurrent"
import { parseSqlTable } from "../sql/parseSqlTable"

export const getUserQueue =
	(client: PGClient) =>
		({ userId, tableName }: GetUserQueueInput) =>
			sqlQuery(client)({
				sql: SELECT_USER_QUEUE_SONGS,
				parse: parseSqlTable<UserQueue>(),
				variables: [{
					key: "userId",
					value: userId,
				},{
					string: false,
					key: "tableName",
					value: tableName,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.SONG, "songs"),
				}],
			})

export const getUserQueues =
	(client: PGClient) =>
		async (userId: string) => {
			const [ prevs, current, nexts, laters ] = await Promise.all([
				getUserQueue(client)({ userId, tableName: "users_prevs" }),
				getUserCurrent(client)(userId),
				getUserQueue(client)({ userId, tableName: "users_nexts" }),
				getUserQueue(client)({ userId, tableName: "users_laters" }),
			])
			return { prevs, current, nexts, laters } as UserQueues
		}