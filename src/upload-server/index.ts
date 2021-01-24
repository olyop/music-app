import cors from "cors"
import http from "http"
import morgan from "morgan"
import helmet from "helmet"
import express from "express"
import bodyParser from "body-parser"
import compression from "compression"
import cookieParser from "cookie-parser"

import {
	PORT,
	LOG_FORMAT,
	CORS_CONFIG,
	PUBLIC_PATH,
} from "./globals"

import {
	serveClient,
	globalHeaders,
	artistPhotoSearch,
} from "./middleware"

const app = express()

// middleware stack
app.use(
	morgan(LOG_FORMAT),
	helmet(),
	cors(CORS_CONFIG),
	globalHeaders(),
	compression(),
	bodyParser.json(),
	bodyParser.urlencoded({ extended: false }),
	cookieParser(),
	express.static(PUBLIC_PATH, { index: false }),
	serveClient(),
)

app.get("/artistPhotoSearch/:name", artistPhotoSearch)

http.createServer(app).listen(PORT)