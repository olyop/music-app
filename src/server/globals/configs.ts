import { PoolConfig } from "pg"
import { CorsOptions } from "cors"
import { HelmetOptions } from "helmet"
import { APP } from "@oly_op/music-app-common/globals"
import { CreateBucketRequest } from "aws-sdk/clients/s3"
import { ApolloServerExpressConfig, GetMiddlewareOptions } from "apollo-server-express"

import {
	HOST,
	PORT,
	IS_DEV,
	AWS_REGION,
	AWS_RDS_DB,
	AWS_RDS_PORT,
	AWS_RDS_USER,
	ALGOLIA_API_KEY,
	AWS_RDS_ENDPOINT,
	AWS_RDS_PASSWORD,
	ALGOLIA_APPLICATION_ID,
} from "./environment"

export const PG_POOL_CONFIG: PoolConfig = {
	port: AWS_RDS_PORT,
	user: AWS_RDS_USER,
	database: AWS_RDS_DB,
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
	origin: IS_DEV && `http://${HOST}:${PORT}/`,
}

export const HELMET_CONFIG: HelmetOptions = {
	hsts: false,
}

export const AWS_S3_CREATE_BUCKET_CONFIG: CreateBucketRequest = {
	Bucket: APP,
	ACL: "private",
	CreateBucketConfiguration: {
		LocationConstraint: AWS_REGION,
	},
}