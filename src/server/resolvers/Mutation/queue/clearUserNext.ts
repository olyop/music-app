import {
	DELETE_USER_PREV,
	DELETE_USER_NEXT,
	DELETE_USER_LATER,
} from "../../../sql"

import { sqlQuery } from "../../../helpers"
import { SqlVariable, Client } from "../../../types"

const clearUserNext =
	(client: Client) => async (userId: string) => {
		const variables: SqlVariable[] = [{
			key: "userId",
			value: userId,
		}]
		await sqlQuery(client)({
			sql: DELETE_USER_PREV,
			variables,
		})
		await sqlQuery(client)({
			sql: DELETE_USER_NEXT,
			variables,
		})
		await sqlQuery(client)({
			sql: DELETE_USER_LATER,
			variables,
		})
	}

export default clearUserNext