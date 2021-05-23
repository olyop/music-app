import {
	join,
	query,
	Client,
	parseRow,
	parseTable,
} from "@oly_op/pg-helpers"

import { map } from "lodash/fp"
import pipe from "@oly_op/pipe"
import { PAGINATION_NUM } from "@oly_op/music-app-common/globals"

import {
	User,
	Song,
	UserQueue,
	UserQueues,
} from "../../types"

import {
	SELECT_USER,
	SELECT_USER_QUEUE,
	SELECT_USER_QUEUE_SONGS,
} from "../../sql"

import { COLUMN_NAMES } from "../../globals"
import { getUserCurrent } from "./getUserCurrent"

export const getUserQueue =
	(client: Client) =>
		(userId: string, tableName: string) =>
			query(client)({
				sql: SELECT_USER_QUEUE,
				parse: parseTable<UserQueue>(),
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
					value: join(COLUMN_NAMES.USER_QUEUE),
				}],
			})

export const getUserQueueIds =
	(client: Client) =>
		(userId: string, tableName: string) =>
			query(client)({
				sql: SELECT_USER_QUEUE,
				parse: pipe(
					parseTable<UserQueue>(),
					map(({ songId }) => songId),
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
					value: join(COLUMN_NAMES.USER_QUEUE),
				}],
			})

export const getUserQueues =
	(client: Client) =>
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
	(client: Client) =>
		(userId: string, tableName: string) =>
			query(client)({
				sql: SELECT_USER_QUEUE_SONGS,
				parse: parseTable<Song>(),
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
					value: join(COLUMN_NAMES.SONG, "songs"),
				}],
			})

export const getUserWithQueue =
	(client: Client) =>
		async (userId: string): Promise<User> => ({
			...await query(client)({
				sql: SELECT_USER,
				parse: parseRow<User>(),
				variables: [{
					key: "userId",
					value: userId,
				},{
					string: false,
					key: "columnNames",
					value: join(COLUMN_NAMES.USER),
				}],
			}),
			prev: await getUserQueueIds(client)(userId, "users_prevs"),
			next: await getUserQueueIds(client)(userId, "users_nexts"),
			later: await getUserQueueIds(client)(userId, "users_laters"),
		})