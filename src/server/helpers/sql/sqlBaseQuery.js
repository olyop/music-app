import identity from "lodash/identity.js"
import isFunction from "lodash/isFunction.js"
import isUndefined from "lodash/isUndefined.js"

const determineArgs = input => {
  const parse = isUndefined(input.parse) ? identity : input.parse
  if (isFunction(input)) {
    const { sql, params } = input()
    return {
      sql,
      parse,
      params,
    }
  } else {
    const { query, variables } = input
    const { sql, params } = query(variables)
    console.log(sql)
    return {
      sql,
      parse,
      params,
    }
  }
}

const sqlBaseQuery = client => config => {
  const { sql, parse, params } = determineArgs(config)
  return client.query(sql, params)
    .then(res => parse(res))
    .catch(err => console.error(err, sql))
}

export default sqlBaseQuery
