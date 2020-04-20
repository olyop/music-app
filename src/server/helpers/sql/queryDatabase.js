import rds from "../aws/rds.js"
import isUndefined from "lodash/isUndefined.js"

const queryDatabase = options => {
  const parse = isUndefined(options.parse) ? x => x : options.args
  const variables = isUndefined(options.variables) ? {} : options.variables
  return new Promise(
    (resolve, reject) => (
      rds.query(text(variables))
        .then(res => resolve(parse(res)))
        .catch(reject)
    )
  )
}

export default queryDatabase
