import {
  AWS_RDS_DB,
  AWS_RDS_PORT,
  AWS_RDS_USER,
  AWS_RDS_ENDPOINT,
  AWS_RDS_PASSWORD,
} from "./environment.js"

export const CORS_CONFIG = {
  origin: "*",
  optionsSuccessStatus: 200,
}

export const PG_CONFIG = {
  port: AWS_RDS_PORT,
  user: AWS_RDS_USER,
  database: AWS_RDS_DB,
  host: AWS_RDS_ENDPOINT,
  password: AWS_RDS_PASSWORD,
}

export const APOLLO_APPLY_CONFIG = {
  cors: false,
  debug: true,
  path: "/graphql",
  subscriptions: false,
  bodyParserConfig: false,
}

export const APOLLO_SERVER_CONFIG = {
  playground: false,
  introspection: true,
}