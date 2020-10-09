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
	origin: IS_DEV && `http://${HOST}:${PORT}/`,
}

export const HELMET_CONFIG: HelmetOptions = {
	contentSecurityPolicy: IS_DEV ? false : {
		directives: {
			"img-src": ["self"],
			"script-src": ["self"],
			"object-src": ["none"],
			"default-src": ["self"],
			"script-src-attr": ["self"],
			"block-all-mixed-content": [],
			"upgrade-insecure-requests": [],
			"font-src": ["fonts.gstatic.com"],
			"style-src": ["self","fonts.googleapis.com"],
		},
	},
}

export const AWS_S3_CREATE_BUCKET_CONFIG: CreateBucketRequest = {
	Bucket: APP,
	ACL: "public-read",
}