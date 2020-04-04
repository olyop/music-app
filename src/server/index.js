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

import {
  HOST,
  PORT,
  LOG_FORMAT,
  BUILD_PATH,
  MONGODB_URL,
  CORS_OPTIONS,
  MONGOOSE_OPTIONS,
  BUILD_ENTRY_PATH,
  GLOBAL_HTTP_HEADERS,
  APOLLO_APPLY_OPTIONS,
} from "./globals.js"

// connect to database
database.openUri(MONGODB_URL, MONGOOSE_OPTIONS)

const app = express()

// middleware stack
app.use(
  logger(LOG_FORMAT),
  responseTime(),
  helmet(),
  compression(),
  cors(CORS_OPTIONS),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  cookieParser(),
)

// set global response headers
app.use(request(({ res, nxt }) => {
  res.set(GLOBAL_HTTP_HEADERS)
  nxt()
}))

// apply apollo server
apolloServer.applyMiddleware({ app, ...APOLLO_APPLY_OPTIONS })

// serve static assests
app.use(express.static(BUILD_PATH))

// serve index.html
app.use("*", request(({ res }) => res.sendFile(BUILD_ENTRY_PATH)))

app.on("error", onError)

app.listen(PORT, HOST)
