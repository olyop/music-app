import express from "express"
import database from "./database/database.js"
import apolloRouter from "./database/apollo.js"

// import middleware
import cors from "cors"
import logger from "morgan"
import helmet from "helmet"
import bodyParser from "body-parser"
import compression from "compression"
import responseTime from "response-time"
import cookieParser from "cookie-parser"
import { globalHeaders } from "./middleware.js"

import { onError } from "./helpers/server.js"

import {
  HOST, PORT, DB_URL,
  MONGOOSE_OPTIONS, APOLLO_OPTIONS,
  LOG_FORMAT, CORS_OPTIONS,
  BUILD_PATH, BUILD_PATH_ENTRY
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

// apply apollo router to app
apolloRouter.applyMiddleware({ app, ...APOLLO_OPTIONS })

// serve static assests
app.use(express.static(BUILD_PATH))

// send index.html
app.use("*", (req, res) => res.sendFile(BUILD_PATH_ENTRY))

app.on("error", onError)

app.listen(PORT, HOST)
