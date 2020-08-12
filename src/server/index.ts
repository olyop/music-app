import cors from "cors"
import logger from "morgan"
import helmet from "helmet"
import express from "express"
import bodyParser from "body-parser"
import compression from "compression"
import cookieParser from "cookie-parser"
import { graphqlUploadExpress } from "graphql-upload"

import {
	graphql,
	sendIndex,
	globalHeaders,
} from "./middleware"

import {
	HOST,
	PORT,
	LOG_FORMAT,
	BUILD_PATH,
	CORS_CONFIG,
} from "./globals"

// import { TABLES } from "./sql"
// import { sql } from "./helpers"

// sql.transaction(TABLES).catch(console.error)

const app = express()

// middleware stack
app.use(
	logger(LOG_FORMAT),
	helmet(),
	compression(),
	cors(CORS_CONFIG),
	bodyParser.json(),
	bodyParser.urlencoded({ extended: false }),
	cookieParser(),
	globalHeaders(),
	graphqlUploadExpress(),
	graphql(),
	express.static(BUILD_PATH),
)

// send index.html
app.use("*", sendIndex())

app.listen(PORT, HOST)