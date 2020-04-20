import path from "path"

process.env.UV_THREADPOOL_SIZE = 12

// import environment variables
export const PORT = process.env.PORT
export const HOST = process.env.HOST
export const APP_NAME = process.env.APP_NAME

export const MONGO_DB = process.env.MONGO_DB
export const MONGO_URL = process.env.MONGO_URL

export const AWS_RDS_DB = process.env.AWS_RDS_DB
export const AWS_RDS_PORT = process.env.AWS_RDS_PORT
export const AWS_RDS_USER = process.env.AWS_RDS_USER
export const AWS_RDS_PASSWORD = process.env.AWS_RDS_PASSWORD
export const AWS_RDS_ENDPOINT = process.env.AWS_RDS_ENDPOINT

export const AWS_S3_ACL = process.env.AWS_S3_ACL
export const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY

export const LOG_FORMAT =
  ":status :date[clf] :url :total-time[0] ms"

export const CORS_OPTIONS = {
  origin: "*",
  optionsSuccessStatus: 200,
}

export const MONGOOSE_OPTIONS = {
  poolSize: 1,
  dbName: MONGO_DB,
  loggerLevel: "error",
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}

export const PG_CONFIG = {
  port: AWS_RDS_PORT,
  user: AWS_RDS_USER,
  database: AWS_RDS_DB,
  host: AWS_RDS_ENDPOINT,
  password: AWS_RDS_PASSWORD,
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

export const BUILD_PATH =
  path.resolve("src", "server", "build")

export const BUILD_ENTRY_PATH =
  path.join(BUILD_PATH, "index.html")

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

export const USER_QUEUE_SELECT =
  { prev: 1, current: 1, next: 1, queue: 1 }

export const TYPE_DEFS_PATH =
  path.join("src", "server", "apollo", "typeDefs.graphql")


