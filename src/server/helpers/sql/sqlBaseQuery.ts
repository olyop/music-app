import { Pool, PoolClient, QueryResult } from "pg"
import { uniq, identity, isString } from "lodash"

import { SQLConfig, SQLVariable } from "../../types"

export const getVariableKeys = (sql: string) => {
	const keys: string[] = []

	// scan flags
	let inCurly = false
	let tempKey = ""
	let inVariable = false

	// scan sql
	// eslint-disable-next-line no-restricted-syntax
	for (const char of sql) {
		if (inVariable) {
			if (char === " ") {
				keys.push(tempKey)
				inVariable = false
				tempKey = ""
			} else {
				tempKey += char
			}
		} else if (inCurly) {
			if (char === " ") {
				inVariable = true
			} else if (char === "}") {
				inCurly = false
			}
		} else if (char === "{") {
			inCurly = true
		}
	}

	return uniq(keys)
}

const areVariablesProvided = (variableKeys: string[], variables: SQLVariable[]) =>
	variables
		.map(({ key }) => variableKeys.includes(key))
		.every(Boolean)

const determineReplaceValue = (
	{ value, string = true, parameterized = false }: SQLVariable,
	params: string[],
) => {
	if (parameterized) {
		params.push(value)
		return `$${params.length}`
	} else if (string) {
		return `'${value}'`
	} else {
		return value
	}
}

const replaceSqlWithValues = (sql: string, variables: SQLVariable[], params: string[]) =>
	variables.reduce(
		(query, variable) => query.replace(
			new RegExp(`{{ ${variable.key} }}`, "gi"),
			determineReplaceValue(variable, params),
		),
		sql,
	)

const normalizeInput = <TReturn>(input: string | SQLConfig<TReturn>) => {
	if (isString(input)) {
		return {
			sql: input,
			parse: identity as (x: QueryResult) => TReturn,
		}
	} else {
		return input
	}
}

export const sqlBaseQuery =
	<TReturn>(client: Pool | PoolClient) =>
		(input: string | SQLConfig<TReturn>) =>
			new Promise<TReturn>(
				(resolve, reject) => {
					const { sql, parse, variables = [] } = normalizeInput<TReturn>(input)
					const variableKeys = getVariableKeys(sql)
					if (!areVariablesProvided(variableKeys, variables)) {
						reject(new TypeError("Invalid query arguments."))
					} else {
						const params: string[] = []
						client
							.query(replaceSqlWithValues(sql, variables, params), params)
							.then(parse)
							.then(resolve)
							.catch(reject)
					}
				},
			)