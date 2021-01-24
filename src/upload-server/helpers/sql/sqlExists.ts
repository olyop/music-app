import { sqlQuery } from "./sqlQuery"
import { EXISTS_COLUMN } from "../../sql"
import { getSqlResExists } from "./getSqlResExists"
import { PGClient, SqlExistsInput } from "../../types"

interface SqlExistsQueryInput extends SqlExistsInput {
	value: string,
}

const existsQuery =
	(client: PGClient) =>
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
	(client: PGClient) =>
		async ({ value, ...input }: SqlExistsInput) => {
			if (Array.isArray(value)) {
				const queries = value.map(val => existsQuery(client)({ ...input, value: val }))
				const res = await Promise.all(queries)
				return res.every(Boolean)
			} else {
				return existsQuery(client)({ ...input, value })
			}
		}