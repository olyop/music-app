import {
  AWS_RDS_DB,
  AWS_RDS_PORT,
  AWS_RDS_USER,
  AWS_RDS_ENDPOINT,
  AWS_RDS_PASSWORD,
  APOLLO_ENGINE_KEY,
} from "./environment.js"

export const CORS_CONFIG = {
  origin: "*",
}

export const PG_CONFIG = {
  port: AWS_RDS_PORT,
  user: AWS_RDS_USER,
  database: AWS_RDS_DB,
  host: AWS_RDS_ENDPOINT,
  password: AWS_RDS_PASSWORD,
}

export const APOLLO_MIDDLEWARE_CONFIG = {
  cors: false,
  debug: true,
  path: "/graphql",
  subscriptions: false,
  bodyParserConfig: false,
}

export const APOLLO_SERVER_CONFIG = {
  playground: false,
  introspection: true,
  engine: { apiKey: APOLLO_ENGINE_KEY },
}
