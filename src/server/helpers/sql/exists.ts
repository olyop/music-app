import { PoolClient } from "pg"

import { baseQuery } from "./baseQuery"
import { resExists } from "./resExists"
import { EXISTS_COLUMN } from "../../sql"

interface ExistsInput {
	table: string,
	column: string,
	value: string | string[],
}

interface ExistsQueryInput extends Omit<ExistsInput, "value"> {
	value: string,
}

const query =
	(client: PoolClient) =>
		({ table, column, value }: ExistsQueryInput) =>
			baseQuery(client)<boolean>({
				sql: EXISTS_COLUMN,
				parse: resExists,
				variables: [{
					value,
					key: "value",
					parameterized: true,
				},{
					key: "table",
					value: table,
					string: false,
				},{
					key: "column",
					value: column,
					string: false,
				}],
			})

export const exists =
	(client: PoolClient) =>
		async ({ value, ...input }: ExistsInput) => {
			if (Array.isArray(value)) {
				const res = await Promise.all(value.map(val => query(client)({ ...input, value: val })))
				return res.every(Boolean)
			} else {
				return query(client)({ ...input, value })
			}
		}