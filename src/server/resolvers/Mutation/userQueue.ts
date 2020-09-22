import {
	SELECT_USER,
	UPDATE_USER_PLAY,
	DELETE_USER_NEXT,
	DELETE_USER_LATER,
} from "../../sql"

import { COLUMN_NAMES } from "../../globals"
import { sql, createResolver } from "../../helpers"
import { User, UserArgs, SqlVariable } from "../../types"

const resolver =
	createResolver()

interface Args extends UserArgs {
	songId: string,
}

export const userPrev =
	resolver<string>(() => "userPrev")

export const userNext =
	resolver<string>(() => "userNext")

export const userPlay =
	resolver<User, Args>(
		({ args }) => (
			sql.query({
				sql: UPDATE_USER_PLAY,
				parse: sql.parseRow(),
				variables: [{
					key: "songId",
					value: args.songId,
				},{
					key: "userId",
					value: args.userId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.USER),
				}],
			})
		),
	)

export const userClearQueue =
	resolver<User, UserArgs>(
		async ({ args }) => {
			const variables: SqlVariable[] = [{
				key: "userId",
				value: args.userId,
			}]
			await sql.query({
				sql: DELETE_USER_NEXT,
				variables,
			})
			await sql.query({
				sql: DELETE_USER_LATER,
				variables,
			})
			return sql.query<User>({
				sql: SELECT_USER,
				parse: sql.parseRow(),
				variables: [{
					key: "userId",
					value: args.userId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.USER),
				}],
			})
		},
	)