import cors from "cors"
import http from "http"
import morgan from "morgan"
import helmet from "helmet"
import express from "express"
import compression from "compression"
import { json, urlencoded } from "body-parser"
import { LOG_FORMAT } from "@oly_op/music-app-common/globals"

import {
	PORT,
	IS_DEV,
	CORS_CONFIG,
	PUBLIC_PATH,
	HELMET_OPTIONS,
	APOLLO_MIDDLEWARE_CONFIG,
} from "./globals"

import apollo from "./apollo"
import serveClient from "./serveClient"

const app = express()

app.use(
	morgan(LOG_FORMAT),
	helmet(HELMET_OPTIONS),
	cors(CORS_CONFIG),
	compression(),
	json(),
	urlencoded({ extended: false }),
	express.static(PUBLIC_PATH, { index: false }),
	apollo.getMiddleware(APOLLO_MIDDLEWARE_CONFIG),
	serveClient(),
)

const onListen =
	() => console.log("Server started.")

http.createServer(app)
		.listen(PORT, IS_DEV ? undefined : onListen)