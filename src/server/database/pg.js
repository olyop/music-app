import pg from "pg"
import yesql from "yesql"
import { pipe, convertToSnakeCase } from "../helpers/index.js"

const { Pool } = pg
const { pg: named } = yesql

const pool = new Pool({ database: "music_app", user: "postgres" })

export const sql = (query, args = {}) => pipe(args)(
  convertToSnakeCase,
  namedParams => named(query)(namedParams),
  ({ text, values }) => pool.query(text, values),
)
