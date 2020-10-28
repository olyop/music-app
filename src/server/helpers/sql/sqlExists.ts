import { sqlQuery } from "./sqlQuery"
import { EXISTS_COLUMN } from "../../sql"
import { getSqlResExists } from "./getSqlResExists"
import { Client, SqlExistsInput } from "../../types"

interface SqlExistsQueryInput extends SqlExistsInput {
	value: string,
}

const query =
	(client: Client) =>
		({ table, column, value }: SqlExistsQueryInput) =>
			sqlQuery(client)<boolean>({
				sql: EXISTS_COLUMN,
				parse: getSqlResExists,
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

export const sqlExists =
	(client: Client) =>
		async ({ value, ...input }: SqlExistsInput) => {
			if (Array.isArray(value)) {
				const res = await Promise.all(value.map(val => query(client)({ ...input, value: val })))
				return res.every(Boolean)
			} else {
				return query(client)({ ...input, value })
			}
		}