import cors from "cors"
import http from "http"
import logger from "morgan"
import helmet from "helmet"
import express from "express"
import bodyParser from "body-parser"
import compression from "compression"
import cookieParser from "cookie-parser"
import { graphqlUploadExpress } from "graphql-upload"

import {
	graphql,
	serveIndex,
	serveStatic,
	globalHeaders,
} from "./middleware"

import {
	HOST,
	PORT,
	LOG_FORMAT,
	CORS_CONFIG,
	HELMET_CONFIG,
} from "./globals"

import initializeSql from "./sql/init"

initializeSql()

const app = express()

// middleware stack
app.use(
	logger(LOG_FORMAT),
	helmet(HELMET_CONFIG),
	cors(CORS_CONFIG),
	globalHeaders(),
	compression(),
	bodyParser.json(),
	bodyParser.urlencoded({ extended: false }),
	cookieParser(),
	graphqlUploadExpress(),
	graphql(),
	serveStatic(),
)

app.use("*", serveIndex())

http.createServer(app).listen(PORT, HOST)