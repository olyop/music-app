import { identity, isFunction, isUndefined } from "lodash"

const determineArgs = input => {
	const parse = isUndefined(input.parse) ? identity : input.parse
	if (isFunction(input)) {
		const { sql, params } = input()
		return {
			sql,
			parse,
			params,
		}
	} else {
		const { query, variables } = input
		const { sql, params } = query(variables)
		return {
			sql,
			parse,
			params,
		}
	}
}

export const sqlBaseQuery = client => config => new Promise(
	(resolve, reject) => {
		const { sql, parse, params } = determineArgs(config)
		client.query(sql, params)
      .then(res => resolve(parse(res)))
      .catch(reject)
	},
)