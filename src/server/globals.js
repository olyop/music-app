import path from "path"

import os from "os"

process.env.UV_THREADPOOL_SIZE = 12

// export const HOST = "0.0.0.0"
export const HOST = os.networkInterfaces().Ethernet[1].address

// export const PORT = 80
export const PORT = 3000

export const S3_BUCKET = "5e0585af655578193c6bd0b0"

export const LOG_FORMAT = ":status :date[clf] :url :response-time[0] ms :total-time[0] ms"

export const CORS_OPTIONS = {
  origin: "*",
  optionsSuccessStatus: 200,
}

export const MONGODB_URL = "mongodb://localhost:27017"

export const MONGOOSE_OPTIONS = {
  poolSize: 1,
  dbName: "music-app",
  loggerLevel: "error",
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
  versionKey: false,
  timestamps: false,
}

export const APOLLO_SERVER_OPTIONS = {
  introspection: true,
}

export const SONG_ARTISTS_FIELDS = ["artists", "remixers", "featuring"]

export const USER_EMPTY_QUEUE = {
  prev: [],
  next: [],
  queue: [],
  current: null,
}

export const USER_QUEUE_SELECT = { prev: 1, current: 1, next: 1, queue: 1 }

export const TYPE_DEFS_PATH = path.resolve("src", "server", "apollo", "typeDefs.graphql")
