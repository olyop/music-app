import path from "path"

const ROOT_PATH = process.cwd()
export const SERVER_PATH = path.join(ROOT_PATH, "build/server")
export const SQL_PATH = path.join(SERVER_PATH, "sql")
export const PUBLIC_PATH = path.join(SERVER_PATH, "public")
export const CLIENT_ENTRY_PATH = path.join(PUBLIC_PATH, "index.html")