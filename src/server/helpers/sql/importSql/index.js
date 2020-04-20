import fs from "fs"

import listVariableKeys from "./listVariableKeys.js"
import areVariablesValid from "./areVariablesValid.js"
import replaceWithValues from "./replaceWithValues.js"

const importSql = path => {
  const sql = fs.readFileSync(path).toString()
  const variableNames = listVariableKeys(sql)
  return variables => {
    if (areVariablesValid(variables, variableNames)) {
      return new Error("Invalid arguments.")
    } else {
      return replaceWithValues(sql, variables)
    }
  }
}

export default importSql
