import { serializePort } from "./helpers/server.js"
import path from "path"

process.env.UV_THREADPOOL_SIZE = 12

export const HOST = "localhost"
export const PORT = serializePort(process.env.PORT || "3000")

export const LOG_FORMAT = "dev"

export const CORS_OPTIONS = {
  origin: "*",
  optionsSuccessStatus: 200
}

export const DB_URL = "mongodb://localhost:27017/music-app"

export const MONGOOSE_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  poolSize: 1,
}

export const GLOBAL_HEADERS = {
  "Server": "Node.js",
  "X-Powered-By": "Express",
  "X-Frame-Options": "deny"
}

export const APOLLO_OPTIONS = {
  bodyParserConfig: false,
  path: "/graphql",
  cors: false
}

export const BUILD_PATH = path.resolve("src", "server", "build")
export const BUILD_PATH_ENTRY = path.join(BUILD_PATH, "index.html")
