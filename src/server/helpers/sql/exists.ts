import { sqlQuery } from "./sqlQuery"
import { sqlResExists } from "./sqlResExists"

import { EXISTS_COLUMN } from "../../sql/index.js"

const existsQuery = ({ value, table, column }) =>
	sqlQuery({
		sql: EXISTS_COLUMN,
		parse: sqlResExists,
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

export const exists = input =>
	new Promise<boolean>(
		(resolve, reject) => {
			if (Array.isArray(input.value)) {
				return Promise
					.all(input.value.map(value => existsQuery({ ...input, value })))
					.then(res => resolve(res.every(Boolean)))
					.catch(reject)
			} else {
				return existsQuery(input)
					.then(resolve)
					.catch(reject)
			}
		},
	)