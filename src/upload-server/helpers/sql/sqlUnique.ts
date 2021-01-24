import { sqlExists } from "./sqlExists"
import { PGClient, SqlIsUniqueInput } from "../../types"

export const sqlIsUnique =
	(client: PGClient) =>
		async ({ value, table, column }: SqlIsUniqueInput) => {
			const res = await sqlExists(client)({ table, value, column })
			return !res
		}