import cors from "cors"
import logger from "morgan"
import helmet from "helmet"
import express from "express"
import bodyParser from "body-parser"
import compression from "compression"
import cookieParser from "cookie-parser"

import {
	graphql,
	sendIndex,
	sendStatic,
	globalHeaders,
} from "./middleware"

import {
	HOST,
	PORT,
	LOG_FORMAT,
	BUILD_PATH,
	CORS_CONFIG,
	PUBLIC_PATH,
} from "./globals"

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
	graphql(),
	sendStatic(BUILD_PATH),
	sendStatic(PUBLIC_PATH),
)

// send index.html
app.use("*", sendIndex())

app.listen(PORT, HOST)