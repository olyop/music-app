import {
	join,
	Variable,
	parseRow,
	query as pgHelpersQuery,
} from "@oly_op/pg-helpers"

import {
	SELECT_USER,
	DELETE_USER_SONGS,
	DELETE_USER_ARTISTS,
	DELETE_USER_PLAYLISTS,
} from "../../sql"

import { User } from "../../types"
import { COLUMN_NAMES } from "../../globals"
import { createResolver } from "../../helpers"

const resolver =
	createResolver()

export const deleteUserLibrary =
	resolver<User>(
		async ({ context }) => {
			const query = pgHelpersQuery(context.pg)
			const { userId } = context.authorization!

			const variables: Variable[] =
				[{ key: "userId", value: userId }]

			await query({
				sql: DELETE_USER_SONGS,
				variables,
			})
			await query({
				sql: DELETE_USER_ARTISTS,
				variables,
			})
			await query({
				sql: DELETE_USER_PLAYLISTS,
				variables,
			})
			return query({
				sql: SELECT_USER,
				parse: parseRow<User>(),
				variables: [ ...variables, {
					string: false,
					key: "columnNames",
					value: join(COLUMN_NAMES.USER),
				}],
			})
		},
	)