import pg from "pg"
import yesql from "yesql"
import { pipe, convertToSnakeCase } from "../helpers/index.js"

const { Pool } = pg
const { pg: named } = yesql

const pool = new Pool({
  port: process.env.AWS_RDS_PORT,
  user: process.env.AWS_RDS_USER,
  host: process.env.AWS_RDS_ENDPOINT,
  password: process.env.AWS_RDS_PASSWORD,
})

export const sql = (query, args = {}) => pipe(args)(
  convertToSnakeCase,
  namedParams => named(query)(namedParams),
  ({ text, values }) => pool.query(text, values),
)
