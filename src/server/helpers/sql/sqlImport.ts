import fs from "fs"
import { uniq } from "lodash"

import { SqlVariable } from "../../types"

const getVariableKeys = (sql: string) => {
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

const areVariablesProvided = (variableKeys: string[], variables: SqlVariable[]) =>
	variables
		.map(({ key }) => variableKeys.includes(key))
		.every(Boolean)

const determineReplaceValue = (
	{ value, string = true, parameterized = false }: SqlVariable,
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

const replaceSqlWithValues = (sql: string, variables: SqlVariable[], params: string[]) =>
	variables.reduce(
		(query, variable) => query.replace(
			new RegExp(`{{ ${variable.key} }}`, "gi"),
			determineReplaceValue(variable, params),
		),
		sql,
	)

export const sqlImport = (path: string) => {
	const sql = fs.readFileSync(path).toString()
	const variableKeys = getVariableKeys(sql)
	return (variables: SqlVariable[] = []) => {
		if (!areVariablesProvided(variableKeys, variables)) {
			throw new Error("Invalid query arguments.")
		} else {
			const params: string[] = []
			return {
				sql: replaceSqlWithValues(sql, variables, params),
				params,
			}
		}
	}
}