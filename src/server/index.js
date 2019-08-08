import database from "./database/database.js"
import express from "express"

// import api server
import apollo from "./database/apollo.js"

// import middleware
import { globalHeaders } from "./middleware.js"
import responseTime from "response-time"
import cookieParser from "cookie-parser"
import compression from "compression"
import bodyParser from "body-parser"
import logger from "morgan"
import helmet from "helmet"
import cors from "cors"

import {
  HOST, PORT,
  DB_URL, MONGOOSE_OPTIONS,
  LOG_FORMAT, CORS_OPTIONS,
  BUILD_PATH, BUILD_PATH_ENTRY
} from "./globals.js"

import { onError } from "./helpers/server.js"

process.env.UV_THREADPOOL_SIZE = 12

// connect to database
database.openUri(DB_URL, MONGOOSE_OPTIONS)

const app = express()

// middleware stack
app.use(logger(LOG_FORMAT))
app.use(responseTime())
app.use(helmet())
app.use(compression())
app.use(cors(CORS_OPTIONS))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(globalHeaders())

// apply api middleware to app
apollo.applyMiddleware({
  app,
  bodyParserConfig: false,
  cors: false
})

// serve static website
app.use(express.static(BUILD_PATH))

// send index.html
app.use("*", (req, res) => res.sendFile(BUILD_PATH_ENTRY))

app.on("error", onError)

app.listen(PORT, HOST)
