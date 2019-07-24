const { serializePort } = require("./helpers/server")
const path = require("path")

const HOST = "localhost"
const PORT = serializePort(process.env.PORT || "3000")

const GET_DB_URL = db => {
  const username = "admin"
  const password = "unAHnAmJpZl0HQSq"
  const parameters = "?retryWrites=true&w=majority"
  return `mongodb+srv://${username}:${password}@music-app-eajot.mongodb.net/${db}${parameters}`
}

const MONGOOSE_OPTIONS = {
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
  HOST,
  PORT,
  GET_DB_URL, MONGOOSE_OPTIONS,
  GLOBAL_HEADERS,
  BUILD_PATH,
  BUILD_PATH_ENTRY
})
