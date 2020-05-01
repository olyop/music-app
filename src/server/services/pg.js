import pg from "pg"

import {
  AWS_RDS_DB,
  AWS_RDS_PORT,
  AWS_RDS_USER,
  AWS_RDS_ENDPOINT,
  AWS_RDS_PASSWORD,
} from "../globals/environment.js"

const pool = new pg.Pool({
  port: AWS_RDS_PORT,
  user: AWS_RDS_USER,
  database: AWS_RDS_DB,
  host: AWS_RDS_ENDPOINT,
  password: AWS_RDS_PASSWORD,
})

export default pool