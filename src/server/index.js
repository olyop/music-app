import express from "express"
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

import { HOST, PORT } from "./globals/environment.js"
import { LOG_FORMAT } from "./globals/miscellaneous.js"
import { CORS_CONFIG, APOLLO_MIDDLEWARE_CONFIG } from "./globals/configs.js"

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

app.use(apolloServer.getMiddleware(APOLLO_MIDDLEWARE_CONFIG))

app.use(sendStatic)
app.use("*", sendIndex)

app.listen(PORT, HOST)
