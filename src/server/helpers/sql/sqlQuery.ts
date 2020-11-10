import { uniq, isNull, identity, isString, isEmpty } from "lodash"
import { PGClient, SqlQueryInput, SqlParse, SqlVariable } from "../../types"

export const getVariableKeys = (sql: string) => {
	const keys: string[] = []

	// scan flags
	let inCurly = false
	let tempKey = ""
	let inVariable = false

	// scan sql
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

const variablesAreProvided = (sql: string, variables: SqlVariable[]) => {
	const keys = getVariableKeys(sql)
	return variables
		.map(({ key, value }) => keys.includes(key) && value !== undefined)
		.every(Boolean)
}

const determineReplaceValue =
	(params: string[]) =>
		({ value, string = true, parameterized = false }: SqlVariable) => {
			const val = isNull(value) ? "null" : value.toString()
			if (parameterized) {
				params.push(val)
				return `$${params.length}`
			} else if (string) {
				return `'${val}'`
			} else {
				return val
			}
		}

const determineSqlAndParams =
	(sql: string, variables: SqlVariable[]) => {
		const params: string[] = []
		const sqlWithValues = variables.reduce(
			(query, variable) => query.replace(
				new RegExp(`{{ ${variable.key} }}`, "gi"),
				determineReplaceValue(params)(variable),
			),
			sql,
		)
		return {
			params,
			sqlWithValues,
		}
	}

const normalizeInput = <T>(input: string | SqlQueryInput<T>) =>
	(isString(input) ? {
		sql: input,
		parse: identity as SqlParse<T>,
	} as SqlQueryInput<T> : input)

export const sqlQuery =
	(client: PGClient) =>
		async <T>(input: string | SqlQueryInput<T>) => {
			const { sql, parse, log, variables = [] } = normalizeInput(input)
			if (log?.var) {
				console.log(variables)
			}
			if (variablesAreProvided(sql, variables)) {
				const { sqlWithValues, params } = determineSqlAndParams(sql, variables)
				if (log?.sql) {
					console.log(sqlWithValues)
				}
				try {
					const res = await client.query(
						sqlWithValues,
						isEmpty(params) ? undefined : params,
					)
					if (log?.res) {
						console.log(res.rows)
					}
					if (parse) {
						return parse(res)
					} else {
						return (res as unknown) as T
					}
				} catch (err) {
					if (log?.err) console.error(err)
					throw err
				}
			} else {
				throw new TypeError("Invalid query arguments")
			}
		}