import fs from "fs"

import uniq from "lodash/uniq.js"

const getVariableKeys = sql => {
  const keys = []

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

const areVariablesValid = (variableKeys, variables) =>
  variables
    .map(({ key }) => variableKeys.includes(key))
    .every(Boolean)

const determineReplaceValue = ({ value, string = true, parameterized = false }, params) => {
  if (parameterized) {
    params.push(value)
    return `$${params.length}`
  } else if (string) {
    return `'${value}'`
  } else {
    return value
  }
}

const replaceSqlWithValues = (sql, variables, params) => variables.reduce(
  (query, variable) => query.replace(
    new RegExp(`{{ ${variable.key} }}`, "gi"),
    determineReplaceValue(variable, params),
  ),
  sql,
)

const sqlImport = path => {
  const sql = fs.readFileSync(path).toString()
  const variableKeys = getVariableKeys(sql)
  return (variables = []) => {
    if (areVariablesValid(variableKeys, variables)) {
      const params = []
      return {
        sql: replaceSqlWithValues(sql, variables, params),
        params,
      }
    } else {
      throw new Error("Invalid query arguments.")
    }
  }
}

export default sqlImport
