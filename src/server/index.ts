import cors from "cors"
import http from "http"
// import helmet from "helmet"
import express from "express"
import bodyParser from "body-parser"
import compression from "compression"
import cookieParser from "cookie-parser"
import { graphqlUploadExpress } from "graphql-upload"

import {
	logger,
	graphql,
	serveStatic,
	serveUpload,
	serveClient,
	globalHeaders,
} from "./middleware"

import {
	HOST,
	PORT,
	CORS_CONFIG,
} from "./globals"

import initialize from "./initialize"

initialize().catch(console.error)

const app = express()

// middleware stack
app.use(
	logger(),
	// helmet(),
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

app.use("/upload", serveUpload())
app.use(serveClient())

http.createServer(app).listen(PORT, HOST)