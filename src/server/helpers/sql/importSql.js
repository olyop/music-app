import fs from "fs"

import uniq from "lodash/uniq.js"
import keys from "lodash/keys.js"
import includes from "lodash/includes.js"

const sqlVariableNames = sql => {
  const variableNames = []

  // scan flags
  let inCurly = false
  let tempVar = ""
  let inVariable = false

  // scan sql
  for (const char of sql) {
    if (inVariable) {
      if (char === " ") {
        variableNames.push(tempVar)
        inVariable = false
        tempVar = ""
      } else {
        tempVar += char
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

  return uniq(variableNames)
}

const areInputVariablesValid = (names, variables) => {
  const inputKeys = keys(variables)
  return names.reduce(
    (_, name) => !includes(inputKeys, name),
    false,
  )
}

const replaceSqlWithValues = (sql, variableNames, variables) => {
  let returnSql = sql
  variableNames.forEach(key => {
    returnSql = returnSql.replace(
      new RegExp(`{{ ${key} }}`, "gi"),
      variables[key],
    )
  })
  return returnSql
}

const importSql = path => {
  const sql = fs.readFileSync(path).toString()
  const variableNames = sqlVariableNames(sql)
  return variables => {
    if (areInputVariablesValid(variableNames, variables)) {
      throw new Error("Invalid query arguments.")
    } else {
      return replaceSqlWithValues(sql, variableNames, variables)
    }
  }
}

export default importSql
