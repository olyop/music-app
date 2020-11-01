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

const areVariablesProvided = (keys: string[], variables: SqlVariable[]) =>
	variables
		.map(({ key }) => keys.includes(key))
		.every(Boolean)

const determineReplaceValue = (
	{
		value,
		string = true,
		parameterized = false,
	}: SqlVariable,
	params: string[],
) => {
	if (isNull(value)) {
		return "null"
	} else {
		const val = value.toString()
		if (parameterized) {
			params.push(val)
			return `$${params.length}`
		} else if (string) {
			return `'${val}'`
		} else {
			return val
		}
	}
}

const determineSqlAndParams = (sql: string, variables: SqlVariable[]) => {
	const params: string[] = []
	const sqlWithValues = variables.reduce(
		(query, variable) => query.replace(
			new RegExp(`{{ ${variable.key} }}`, "gi"),
			determineReplaceValue(variable, params),
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
			const {
				sql,
				parse,
				logSql = false,
				logVar = false,
				logRes = false,
				variables = [],
			} = normalizeInput(input)
			const variableKeys = getVariableKeys(sql)
			if (logVar) console.log(variables)
			if (!areVariablesProvided(variableKeys, variables)) {
				const errorVariables = variables.map(({ key }) => key).toString()
				throw new TypeError(`Invalid query arguments. ${errorVariables} - ${variableKeys.toString()}`)
			} else {
				const { sqlWithValues, params } = determineSqlAndParams(sql, variables)
				if (logSql) console.log(sqlWithValues)
				try {
					const res = await client.query(sqlWithValues, isEmpty(params) ? undefined : params)
					if (logRes) console.log(res.rows)
					if (parse) return parse(res)
					else return (res as unknown) as T
				} catch (error) {
					console.error(error)
					throw error
				}
			}
		}