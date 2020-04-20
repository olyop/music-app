import pg from "pg"
import yesql from "yesql"
import { PG_CONFIG } from "../globals.js"
import isUndefined from "lodash/isUndefined.js"
import initializeTables from "./initializeTables.js"
import { convertToSnakeCase } from "../helpers/index.js"

const pool = new pg.Pool(PG_CONFIG) 

export const sql = options => {
  const args = isUndefined(options.args) ? {} : options.args
  const parse = isUndefined(options.parse) ? x => x : options.args
  return new Promise(
    (resolve, reject) => {
      const params = convertToSnakeCase(args)
      const { text, values } = yesql.pg(options.query)(params)
      return pool.query(text, values)
        .then(res => resolve(parse(res)))
        .catch(reject)
    },
  )
}

export const sqlIsUnique = ({ query, col, val }) => new Promise(
  (resolve, reject) => (
    sql({ query, args: { col, val: [val] } })
      .then(res => resolve(res.rowCount === 0))
      .catch(reject)
  ),
)

initializeTables(sql)
