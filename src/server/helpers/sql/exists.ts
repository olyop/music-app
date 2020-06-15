import { query } from "./query"
import { resExists } from "./resExists"
import { EXISTS_COLUMN } from "../../sql"

const existsQuery = ({
	table,
	value,
	column,
}: {
	value: string,
	table: string,
	column: string,
}) =>
	query({
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

export const exists = ({
	value,
	...input
}: {
	table: string,
	column: string,
	value: string | string[],
}) =>
	new Promise<boolean>(
		(resolve, reject) => {
			if (Array.isArray(value)) {
				Promise
					.all(value.map(val => existsQuery({ ...input, value: val })))
					.then(res => res.every(Boolean))
					.then(resolve)
					.catch(reject)
			} else {
				existsQuery({ ...input, value })
					.then(resolve)
					.catch(reject)
			}
		},
	)