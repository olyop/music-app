import { PoolConfig } from "pg"
import type helmet from "helmet"
import { CorsOptions } from "cors"

import {
	AWS_RDS_ENDPOINT,
	AWS_RDS_PASSWORD,
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
}

export const CORS_CONFIG: CorsOptions = {
	origin: "*",
}