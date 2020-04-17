import path from "path"

process.env.UV_THREADPOOL_SIZE = 12

export const LOG_FORMAT = ":status :date[clf] :url :response-time[0] ms :total-time[0] ms"

export const CORS_OPTIONS = {
  origin: "*",
  optionsSuccessStatus: 200,
}

export const MONGOOSE_OPTIONS = {
  poolSize: 1,
  loggerLevel: "error",
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  dbName: process.env.MONGO_DB,
}

export const PG_CONFIG = {
  port: process.env.AWS_RDS_PORT,
  user: process.env.AWS_RDS_USER,
  database: process.env.AWS_RDS_DB,
  host: process.env.AWS_RDS_ENDPOINT,
  password: process.env.AWS_RDS_PASSWORD,
}

export const GLOBAL_HTTP_HEADERS = {
  "Server": "Node.js",
  "X-Powered-By": "Express",
  "X-Frame-Options": "deny",
}

export const APOLLO_APPLY_OPTIONS = {
  cors: false,
  path: "/graphql",
  subscriptions: false,
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

export const SONG_ARTISTS_FIELDS = [
  "artists",
  "remixers",
  "featuring",
]

export const USER_EMPTY_QUEUE = {
  prev: [],
  next: [],
  queue: [],
  current: null,
}

export const USER_QUEUE_SELECT = { prev: 1, current: 1, next: 1, queue: 1 }

export const SERVER_PATH = path.resolve("src", "server")
export const SQL_FOLDER_PATH = path.join(SERVER_PATH, "sql")
export const TYPE_DEFS_PATH = path.join(SERVER_PATH, "apollo", "typeDefs.graphql")
