import path from "path"
import { serializePort } from "./helpers/server.js"

import os from "os"

process.env.UV_THREADPOOL_SIZE = 12

// export const HOST = "0.0.0.0"
export const HOST = os.networkInterfaces().Ethernet[1].address

// export const PORT = 80
export const PORT = serializePort(process.env.PORT || 3000)

export const LOG_FORMAT = "dev"

export const CORS_OPTIONS = {
  origin: "*",
  optionsSuccessStatus: 200,
}

export const DB_URL = "mongodb://localhost:27017/music-app"

export const MONGOOSE_OPTIONS = {
  poolSize: 1,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}

export const GLOBAL_HEADERS = {
  "Server": "Node.js",
  "X-Powered-By": "Express",
  "X-Frame-Options": "deny",
}

export const APOLLO_OPTIONS = {
  cors: false,
  path: "/graphql",
  bodyParserConfig: false,
}

export const BUILD_PATH = path.resolve("src", "server", "build")
export const BUILD_PATH_ENTRY = path.join(BUILD_PATH, "index.html")
