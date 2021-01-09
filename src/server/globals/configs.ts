import { PoolConfig } from "pg"
import { CorsOptions } from "cors"
import { ApolloServerExpressConfig, GetMiddlewareOptions } from "apollo-server-express"

import {
	PORT,
	IS_DEV,
	ALGOLIA_API_KEY,
	AWS_RDS_ENDPOINT,
	AWS_RDS_PASSWORD,
	ALGOLIA_APPLICATION_ID,
} from "./environment"

export const PG_POOL_CONFIG: PoolConfig = {
	port: 5432,
	user: "postgres",
	database: "index",
	host: AWS_RDS_ENDPOINT,
	password: AWS_RDS_PASSWORD,
	parseInputDatesAsUTC: true,
}

export const ALGOLIA_CONFIG: [string, string] = [
	ALGOLIA_APPLICATION_ID,
	ALGOLIA_API_KEY,
]

export const APOLLO_MIDDLEWARE_CONFIG: GetMiddlewareOptions = {
	cors: false,
	path: "/graphql",
	bodyParserConfig: false,
}

export const APOLLO_SERVER_CONFIG: ApolloServerExpressConfig = {
	debug: IS_DEV,
	uploads: false,
	introspection: IS_DEV,
	playground: { settings: { "editor.theme": "light" } },
}

export const CORS_CONFIG: CorsOptions = {
	origin: IS_DEV ? `http://localhost:${PORT}/` : undefined,
}