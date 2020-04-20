import keys from "lodash/keys.js"

const replaceWithValues = (sql, variables) => {
  let returnSql = sql
  keys(variables).forEach(key => {
    returnSql = returnSql.replace(new RegExp(`{{ ${key} }}`, "gi"), variables[key])
  })
  return returnSql
}

export default replaceWithValues
