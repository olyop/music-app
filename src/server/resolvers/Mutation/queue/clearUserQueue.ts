import { PGClient } from "../../../types"
import { sqlQuery } from "../../../helpers"
import clearUserNext from "./clearUserNext"
import { UPDATE_USER_CURRENT } from "../../../sql"

const clearUserQueue =
	(client: PGClient) => async (userId: string) => {
		await clearUserNext(client)(userId)
		await sqlQuery(client)({
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

export default clearUserQueue