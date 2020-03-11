import express from "express"
import database from "./database/index.js"
import { request } from "./helpers/misc.js"
import apolloServer from "./apollo/index.js"
import { onError } from "./helpers/server.js"

// import middleware
import cors from "cors"
import logger from "morgan"
import helmet from "helmet"
import bodyParser from "body-parser"
import compression from "compression"
import responseTime from "response-time"
import cookieParser from "cookie-parser"
import { globalHeaders } from "./middleware.js"

import {
  HOST,
  PORT,
  DB_URL,
  LOG_FORMAT,
  BUILD_PATH,
  CORS_OPTIONS,
  MONGOOSE_OPTIONS,
  BUILD_ENTRY_PATH,
  APOLLO_APPLY_OPTIONS,
} from "./globals.js"

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

// apply apollo server to app
apolloServer.applyMiddleware({ app, ...APOLLO_APPLY_OPTIONS })

// serve static assests
app.use(express.static(BUILD_PATH))

// send index.html
app.use("*", request(({ res }) => res.sendFile(BUILD_ENTRY_PATH)))

app.on("error", onError)
app.listen(PORT, HOST)
