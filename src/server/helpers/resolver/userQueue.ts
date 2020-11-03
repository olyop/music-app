import { PAGINATION_NUM } from "@oly_op/music-app-common/globals"

import {
	Song,
	PGClient,
	UserQueue,
	UserQueues,
} from "../../types"

import {
	SELECT_USER_QUEUE,
	SELECT_USER_QUEUE_SONGS,
} from "../../sql"

import { sqlJoin } from "../sql/sqlJoin"
import { sqlQuery } from "../sql/sqlQuery"
import { COLUMN_NAMES } from "../../globals"
import { getUserCurrent } from "./getUserCurrent"
import { parseSqlTable } from "../sql/parseSqlTable"

export const getUserQueue =
	(client: PGClient) =>
		(userId: string, tableName: string) =>
			sqlQuery(client)({
				sql: SELECT_USER_QUEUE,
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
					value: sqlJoin(COLUMN_NAMES.USER_QUEUE),
				}],
			})

export const getUserQueues =
	(client: PGClient) =>
		async (userId: string): Promise<UserQueues> => {
			const [ current, prevs, nexts, laters ] = await Promise.all([
				getUserCurrent(client)(userId),
				getUserQueue(client)(userId, "users_prevs"),
				getUserQueue(client)(userId, "users_nexts"),
				getUserQueue(client)(userId, "users_laters"),
			])
			return { current, prevs, nexts, laters }
		}

export const getUserQueueSongs =
	(client: PGClient) =>
		(userId: string, tableName: string) =>
			sqlQuery(client)({
				sql: SELECT_USER_QUEUE_SONGS,
				parse: parseSqlTable<Song>(),
				variables: [{
					key: "userId",
					value: userId,
				},{
					string: false,
					key: "tableName",
					value: tableName,
				},{
					string: false,
					key: "paginationNum",
					value: PAGINATION_NUM,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.SONG, "songs"),
				}],
			})