import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import express from "express"
import bodyParser from "body-parser"
import compression from "compression"
import cookieParser from "cookie-parser"
import { LOG_FORMAT } from "@oly_op/music-app-common/globals"

import {
	PORT,
	CORS_CONFIG,
	PUBLIC_PATH,
	APOLLO_MIDDLEWARE_CONFIG,
} from "./globals"

import apollo from "./apollo"
import serveClient from "./serveClient"

const app = express()

app.use(
	morgan(LOG_FORMAT),
	helmet(),
	cors(CORS_CONFIG),
	compression(),
	bodyParser.json(),
	bodyParser.urlencoded({ extended: false }),
	cookieParser(),
	express.static(PUBLIC_PATH, { index: false }),
	apollo.getMiddleware(APOLLO_MIDDLEWARE_CONFIG),
	serveClient(),
)

app.listen(PORT)