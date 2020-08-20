import { PoolClient } from "pg"

import { exists } from "./exists"

interface UniqueInput {
	value: string,
	table: string,
	column: string,
}

export const unique =
	(client: PoolClient) =>
		async ({ value, table, column }: UniqueInput) => {
			const res = await exists(client)({ table, value, column })
			return !res
		}