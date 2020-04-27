import express from "express"
import database from "./database/index.js"
import apolloServer from "./apollo/index.js"

// middleware stack
import cors from "cors"
import logger from "morgan"
import helmet from "helmet"
import bodyParser from "body-parser"
import compression from "compression"
import cookieParser from "cookie-parser"
import sendIndex from "./middleware/sendIndex.js"
import sendStatic from "./middleware/sendStatic.js"
import globalHeaders from "./middleware/globalHeaders.js"

import { LOG_FORMAT } from "./globals/miscellaneous.js"
import { HOST, PORT, MONGO_URL } from "./globals/environment.js"
import { CORS_CONFIG, MONGOOSE_CONFIG, APOLLO_APPLY_CONFIG } from "./globals/configs.js"

// connect to database
database.openUri(MONGO_URL, MONGOOSE_CONFIG)

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
)

apolloServer.applyMiddleware({ app, ...APOLLO_APPLY_CONFIG })

app.use(sendStatic)
app.use("*", sendIndex)

app.listen(PORT, HOST)
