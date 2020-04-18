import pg from "pg"
import yesql from "yesql"
import { PG_CONFIG } from "../globals.js"
import initializeTables from "./initializeTables.js"
import { pipe, convertToSnakeCase } from "../helpers/index.js"

const pool = new pg.Pool(PG_CONFIG)

export const sql = (query, args = {}) => pipe(args)(
  convertToSnakeCase,
  params => yesql.pg(query)(params),
  ({ text, values }) => pool.query(text, values),
)

initializeTables(sql)
