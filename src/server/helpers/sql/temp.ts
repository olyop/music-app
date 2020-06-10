import fs from "fs"

import { SqlVariable } from "../../types"

export const sqlImport = (path: string) => {
	const sql = fs.readFileSync(path).toString()
	const variableKeys = getVariableKeys(sql)
	return (variables: SqlVariable[] = []) => {
		if (!areVariablesProvided(variableKeys, variables)) {
			throw new Error("Invalid query arguments.")
		} else {
			const params: string[] = []
			return {
				params,
				sql: replaceSqlWithValues(sql, variables, params),
			}
		}
	}
}