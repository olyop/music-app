import { sql } from "../../../helpers"
import { Client } from "../../../types"
import clearUserNext from "./clearUserNext"
import { UPDATE_USER_CURRENT } from "../../../sql"

const clearUserQueue =
	(client: Client) => async (userId: string) => {
		await clearUserNext(client)(userId)
		await sql.baseQuery(client)({
			sql: UPDATE_USER_CURRENT,
			variables: [{
				value: null,
				key: "songId",
				string: false,
			},{
				key: "userId",
				value: userId,
			},{
				value: "*",
				string: false,
				key: "columnNames",
			}],
		})
	}

export default clearUserQueue