const express = require("express")

const { connect } = require("mongoose")

// import api server
const apolloServer = require("./db/apolloServer")

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
  DB_URL, MONGOOSE_CONFIG,
  BUILD_PATH, BUILD_PATH_ENTRY
} = require("./globals")

const { onError, onListening } = require("./helpers/server")

// connect to mongodb server
connect(DB_URL, MONGOOSE_CONFIG)

const app = express()

// middleware stack
app.use(logger("dev"))
app.use(responseTime())
app.use(helmet())
app.use(compression())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(globalHeaders())

// apply api middleware to app
apolloServer.applyMiddleware({
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
