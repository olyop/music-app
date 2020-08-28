import { uniq, identity, isString } from "lodash"
import { Client, SQLConfig, SQLQueryResult, SQLVariable } from "../../types"

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

const normalizeInput = <TReturn>(input: string | SQLConfig<TReturn>) =>
	(isString(input) ? {
		sql: input,
		parse: identity as (x: SQLQueryResult) => TReturn,
	} : input)

export const baseQuery =
	(client: Client) =>
		<TReturn>(input: string | SQLConfig<TReturn>) =>
			new Promise<TReturn>(
				(resolve, reject) => {
					const { sql, log, parse, variables = [] } = normalizeInput(input)
					const variableKeys = getVariableKeys(sql)
					if (!areVariablesProvided(variableKeys, variables)) {
						// eslint-disable-next-line max-len
						const err = new TypeError(`Invalid query arguments. ${variables.map(({ key }) => key).toString()} - ${variableKeys.toString()}`)
						console.error({ err, sql })
						reject(err)
					} else {
						const params: string[] = []
						const sqlWithValues = replaceSqlWithValues(sql, variables, params)
						if (log) console.log(sqlWithValues, params)
						client.query(sqlWithValues, params)
									.then(parse)
									.then(resolve)
									.catch(reject)
					}
				},
			)