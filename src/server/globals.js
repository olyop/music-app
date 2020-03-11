import path from "path"
import { serializePort } from "./helpers/server.js"

import os from "os"

process.env.UV_THREADPOOL_SIZE = 12

// export const HOST = "0.0.0.0"
export const HOST = os.networkInterfaces().Ethernet[1].address

// export const PORT = 80
export const PORT = serializePort(process.env.PORT || 3000)

export const S3_ACL = "public-read"
export const S3_BUCKET_NAME = "5e0585af655578193c6bd0b0"

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

export const GLOBAL_HTTP_HEADERS = {
  "Server": "Node.js",
  "X-Powered-By": "Express",
  "X-Frame-Options": "deny",
}

export const APOLLO_APPLY_OPTIONS = {
  cors: false,
  path: "/graphql",
  bodyParserConfig: false,
}

export const BUILD_PATH = path.resolve("src", "server", "build")

export const BUILD_ENTRY_PATH = path.join(BUILD_PATH, "index.html")

export const SCHEMA_OPTIONS = {
  id: false,
  versionKey: true,
  timestamps: false,
}

export const APOLLO_SERVER_OPTIONS = {
  introspection: true,
}

export const SONG_ARTISTS_FIELDS = ["artists", "remixers", "featuring"]
