import { query, Client } from "@oly_op/pg-helpers"

import {
	DELETE_USER_PREV,
	DELETE_USER_NEXT,
	DELETE_USER_LATER,
	UPDATE_USER_CURRENT,
} from "../../../sql"

export const clearUserNext =
	(client: Client) =>
		async (userId: string) => {
			await query(client)({
				sql: DELETE_USER_NEXT,
				variables: [{
					key: "userId",
					value: userId,
				}],
			})
			await query(client)({
				sql: DELETE_USER_LATER,
				variables: [{
					key: "userId",
					value: userId,
				}],
			})
		}

export const clearUserPrev =
	(client: Client) =>
		async (userId: string) => {
			await query(client)({
				sql: DELETE_USER_PREV,
				variables: [{
					key: "userId",
					value: userId,
				}],
			})
		}

export const clearUserQueue =
	(client: Client) =>
		async (userId: string) => {
			await clearUserPrev(client)(userId)
			await clearUserNext(client)(userId)
			await query(client)({
				sql: UPDATE_USER_CURRENT,
				variables: [{
					key: "userId",
					value: userId,
				},{
					value: null,
					key: "songId",
					string: false,
				},{
					value: "*",
					string: false,
					key: "columnNames",
				}],
			})
		}