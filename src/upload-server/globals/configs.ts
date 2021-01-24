import { PoolConfig } from "pg"
import { CorsOptions } from "cors"

import {
	PORT,
	IS_DEV,
	AWS_RDS_ENDPOINT,
	AWS_RDS_PASSWORD,
} from "./environment"

export const PG_POOL_CONFIG: PoolConfig = {
	port: 5432,
	user: "postgres",
	database: "index",
	host: AWS_RDS_ENDPOINT,
	password: AWS_RDS_PASSWORD,
	parseInputDatesAsUTC: true,
}

export const CORS_CONFIG: CorsOptions = {
	origin: IS_DEV ? `http://localhost:${PORT}/` : undefined,
}