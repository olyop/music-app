import cors from "cors"
import logger from "morgan"
import helmet from "helmet"
import express from "express"
import bodyParser from "body-parser"
import compression from "compression"
import cookieParser from "cookie-parser"

import apollo from "./apollo"
import { sendIndex, sendStatic, globalHeaders } from "./middleware"

import {
	HOST,
	PORT,
	LOG_FORMAT,
	CORS_CONFIG,
	APOLLO_MIDDLEWARE_CONFIG,
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
	apollo.getMiddleware(APOLLO_MIDDLEWARE_CONFIG),
	sendStatic(),
)

// send index.html
app.use("*", sendIndex())

app.listen(PORT, HOST)