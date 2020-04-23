import rds from "../../aws/rds.js"
import isArray from "lodash/isArray.js"
import noopParse from "../utils/noopParse.js"
import isUndefined from "lodash/isUndefined.js"

const getQueryConfig = params => ({
  parse: isUndefined(params.parse) ? noopParse : params.parse,
  variables: isUndefined(params.variables) ? {} : params.variables,
})

const queryDatabase = input => {
  if (isArray(input)) {
    return new Promise(
      (resolve, reject) => {
        rds.pool.connect(
          (error, client, done) => {
            client.query("BEGIN", () => {
              const queries = Promise.all(input.map(queryConfig => {
                const { query, parse, variables } = getQueryConfig(queryConfig)
                return client.query(query(variables))
                  .then(res => parse(res))
              }))
              queries.then(res => resolve(res))
                .then(client.query("COMMIT"))
                .catch(reject)
                .finally(done)
            })
          },
        )
      },
    )
  } else {
    const { query, parse, variables } = getQueryConfig(input)
    return new Promise(
      (resolve, reject) => {
        rds.query(query(variables))
          .then(res => resolve(parse(res)))
          .catch(reject)
      },
    )
  }
}

export default queryDatabase
