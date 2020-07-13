import { PoolConfig } from "pg"
import { CorsOptions } from "cors"
import { ClientConfiguration } from "aws-sdk/clients/s3"
import { ApolloServerExpressConfig, GetMiddlewareOptions } from "apollo-server-express"

import {
	HOST,
	PORT,
	NODE_ENV,
	APOLLO_KEY,
	AWS_RDS_DB,
	AWS_RDS_PORT,
	AWS_RDS_USER,
	AWS_RDS_ENDPOINT,
	AWS_RDS_PASSWORD,
	AWS_ACCESS_KEY_ID,
	AWS_SECRET_ACCESS_KEY,
} from "./environment"

export const CORS_CONFIG: CorsOptions = {
	origin: NODE_ENV === "production" ? `http://${HOST}:${PORT}/` : "*",
}

export const PG_POOL_CONFIG: PoolConfig = {
	port: AWS_RDS_PORT,
	user: AWS_RDS_USER,
	database: AWS_RDS_DB,
	host: AWS_RDS_ENDPOINT,
	password: AWS_RDS_PASSWORD,
}

export const APOLLO_MIDDLEWARE_CONFIG: GetMiddlewareOptions = {
	cors: false,
	path: "/graphql",
	bodyParserConfig: false,
}

export const APOLLO_SERVER_CONFIG: ApolloServerExpressConfig = {
	introspection: true,
	engine: { apiKey: APOLLO_KEY },
	playground: { settings: { "editor.theme": "light" } },
}

export const AWS_S3_CONFIG: ClientConfiguration = {
	accessKeyId: AWS_ACCESS_KEY_ID,
	secretAccessKey: AWS_SECRET_ACCESS_KEY,
}