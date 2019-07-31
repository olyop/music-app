const database = require("./database/connection")
const express = require("express")

// import api server
const apollo = require("./database/apollo")

// import middleware
const { globalHeaders } = require("./middleware")
const responseTime = require("response-time")
const cookieParser = require("cookie-parser")
const compression = require("compression")
const bodyParser = require("body-parser")
const logger = require("morgan")
const helmet = require("helmet")
const cors = require("cors")

const {
  HOST, PORT,
  DB_URL, MONGOOSE_OPTIONS,
  LOG_FORMAT, CORS_OPTIONS,
  BUILD_PATH, BUILD_PATH_ENTRY
} = require("./globals")

const { onError, onListening } = require("./helpers/server")

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
app.on("listening", onListening)

app.listen(PORT, HOST)
