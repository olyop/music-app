const { serializePort } = require("./helpers/server")
const { assign } = require("lodash")
const path = require("path")

const HOST = "localhost"
const PORT = serializePort(process.env.PORT || "3000")

const LOG_FORMAT = "dev"

const CORS_OPTIONS = {
  origin: "*",
  optionsSuccessStatus: 200
}

const DB_URL = "mongodb://localhost:27017/music-app"

const MONGOOSE_OPTIONS = {
  useNewUrlParser: true,
  autoIndex: false
}

const GLOBAL_HEADERS = {
  "Server": "Node.js",
  "X-Powered-By": "Express",
  "X-Frame-Options": "deny"
}

const BUILD_PATH = path.resolve("src", "server", "build")
const BUILD_PATH_ENTRY = path.join(BUILD_PATH, "index.html")

assign(exports, {
  HOST, PORT,
  LOG_FORMAT, CORS_OPTIONS,
  DB_URL, MONGOOSE_OPTIONS,
  GLOBAL_HEADERS,
  BUILD_PATH, BUILD_PATH_ENTRY
})
