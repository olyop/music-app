import { Client } from "../../types"
import { sqlExists } from "./sqlExists"

interface SqlIsUniqueInput {
	value: string,
	table: string,
	column: string,
}

export const sqlIsUnique =
	(client: Client) =>
		async ({ value, table, column }: SqlIsUniqueInput) => {
			const res = await sqlExists(client)({ table, value, column })
			return !res
		}