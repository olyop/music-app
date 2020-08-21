import { exists } from "./exists"
import { Client } from "../../types"

interface UniqueInput {
	value: string,
	table: string,
	column: string,
}

export const unique =
	(client: Client) =>
		async ({ value, table, column }: UniqueInput) => {
			const res = await exists(client)({ table, value, column })
			return !res
		}