import { PoolConfig } from "pg"
import type helmet from "helmet"
import { CorsOptions } from "cors"
import { SignOptions } from "jsonwebtoken"
import { ApolloServerExpressConfig, GetMiddlewareOptions } from "apollo-server-express"

import {
	IS_DEV,
	ALGOLIA_API_KEY,
	AWS_RDS_ENDPOINT,
	AWS_RDS_PASSWORD,
	ALGOLIA_APPLICATION_ID,
} from "./environment"

type HelmetOptions = Parameters<typeof helmet>[0]

export const HELMET_OPTIONS: HelmetOptions = {
	contentSecurityPolicy: false,
}

export const PG_POOL_CONFIG: PoolConfig = {
	port: 5432,
	user: "postgres",
	database: "index",
	host: AWS_RDS_ENDPOINT,
	password: AWS_RDS_PASSWORD,
	parseInputDatesAsUTC: true,
	idleTimeoutMillis: 1000 * 2,
}

export const ALGOLIA_CONFIG: [string, string] = [
	ALGOLIA_APPLICATION_ID,
	ALGOLIA_API_KEY,
]

export const APOLLO_MIDDLEWARE_CONFIG: GetMiddlewareOptions = {
	cors: false,
	bodyParserConfig: false,
}

export const APOLLO_SERVER_CONFIG: ApolloServerExpressConfig = {
	debug: IS_DEV,
	uploads: false,
	introspection: IS_DEV,
	playground: { settings: { "editor.theme": "light" } },
}

export const CORS_CONFIG: CorsOptions = {
	origin: "*",
}

export const JWT_SIGN_CONFIG: SignOptions = {
	expiresIn: "3d",
}