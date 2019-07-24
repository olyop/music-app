const express = require("express")

// import api server
const apollo = require("./db/apollo")

// import middleware
const { globalHeaders } = require("./middleware")
const responseTime = require("response-time")
const cookieParser = require("cookie-parser")
const compression = require("compression")
const bodyParser = require("body-parser")
const logger = require("morgan")
const helmet = require("helmet")
const cors = require("cors")

const { HOST, PORT, BUILD_PATH, BUILD_PATH_ENTRY } = require("./globals")
const { onError, onListening } = require("./helpers/server")

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
