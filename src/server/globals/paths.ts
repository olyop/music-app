import path from "path"

import { IS_DEV } from "./environment"

export const ROOT_PATH =
	process.cwd()

export const SERVER_PATH =
	IS_DEV ? path.join(ROOT_PATH, "src", "server") : path.join(ROOT_PATH, "dist")

export const BUILD_PATH =
	path.join(SERVER_PATH, "build")

export const BUILD_CLIENT_PATH =
	path.join(BUILD_PATH, "client")

export const BUILD_CLIENT_ENTRY_PATH =
	path.join(BUILD_CLIENT_PATH, "index.html")

export const SQL_FOLER_PATH =
	path.join(SERVER_PATH, "sql")