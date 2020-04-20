import express from "express"
import database from "./database/index.js"
import apolloServer from "./apollo/index.js"
import { initializeTables } from "./helpers/index.js"

// import middleware
import cors from "cors"
import logger from "morgan"
import helmet from "helmet"
import bodyParser from "body-parser"
import compression from "compression"
import cookieParser from "cookie-parser"


import {
  LOG_FORMAT,
  CORS_OPTIONS,
  MONGOOSE_OPTIONS,
  APOLLO_APPLY_OPTIONS,
} from "./globals.js"

import {
  onError,
  sendIndex,
  sendStatic,
  globalHeaders,
} from "./middleware/index.js"

initializeTables()

// connect to database
database.openUri(process.env.MONGO_URL, MONGOOSE_OPTIONS)

const app = express()

// middleware stack
app.use(
  logger(LOG_FORMAT),
  helmet(),
  compression(),
  cors(CORS_OPTIONS),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  cookieParser(),
  globalHeaders(),
)

apolloServer.applyMiddleware({ app, ...APOLLO_APPLY_OPTIONS })

app.use(sendStatic)

app.use("*", sendIndex)

app.on("error", onError)

app.listen(process.env.PORT, process.env.HOST)
