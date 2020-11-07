import pipe from "@oly_op/pipe"
import { orderBy } from "lodash"
import { PAGINATION_NUM } from "@oly_op/music-app-common/globals"

import {
	User,
	Song,
	PGClient,
	UserQueue,
	UserQueues,
} from "../../types"

import {
	SELECT_USER,
	SELECT_USER_QUEUE,
	SELECT_USER_QUEUE_SONGS,
} from "../../sql"

import { sqlJoin } from "../sql/sqlJoin"
import { sqlQuery } from "../sql/sqlQuery"
import { COLUMN_NAMES } from "../../globals"
import { parseSqlRow } from "../sql/parseSqlRow"
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

export const getUserQueueIds =
	(client: PGClient) =>
		(userId: string, tableName: string) =>
			sqlQuery(client)({
				sql: SELECT_USER_QUEUE,
				parse: pipe(
					parseSqlTable<UserQueue>(),
					songs => orderBy(songs, "index", "asc"),
					songs => songs.map(({ songId }) => songId),
				),
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
			const [ current, prev, next, later ] = await Promise.all([
				getUserCurrent(client)(userId),
				getUserQueue(client)(userId, "users_prevs"),
				getUserQueue(client)(userId, "users_nexts"),
				getUserQueue(client)(userId, "users_laters"),
			])
			return { current, prev, next, later }
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

export const getUserWithQueue =
	(client: PGClient) =>
		async (userId: string): Promise<User> => ({
			...await sqlQuery(client)({
				sql: SELECT_USER,
				parse: parseSqlRow<User>(),
				variables: [{
					key: "userId",
					value: userId,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.USER),
				}],
			}),
			prev: await getUserQueueIds(client)(userId, "users_prevs"),
			next: await getUserQueueIds(client)(userId, "users_nexts"),
			later: await getUserQueueIds(client)(userId, "users_laters"),
		})