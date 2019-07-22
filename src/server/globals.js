const { serializePort } = require("./helpers/server")
const path = require("path")

const HOST = "localhost"
const PORT = serializePort(process.env.PORT || "3000")

const DB_URL = "mongodb://localhost:27017/boilerplate"

const MONGOOSE_CONFIG = {
  useNewUrlParser: true
}

const GLOBAL_HEADERS = {
  "Server": "Node.js",
  "X-Powered-By": "Express",
  "X-Frame-Options": "deny"
}

const BUILD_PATH = path.resolve("src", "server", "build")
const BUILD_PATH_ENTRY = path.join(BUILD_PATH, "index.html")

Object.assign(exports, {
  HOST, PORT,
  DB_URL, MONGOOSE_CONFIG,
  GLOBAL_HEADERS,
  BUILD_PATH, BUILD_PATH_ENTRY
})
