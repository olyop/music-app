import path from "path"

export const SERVER_PATH =
  path.resolve("src", "server")

export const BUILD_PATH =
  path.resolve(SERVER_PATH, "build")

export const BUILD_ENTRY_PATH =
  path.join(BUILD_PATH, "index.html")

export const SQL_FOLER_PATH =
  path.join(SERVER_PATH, "sql")

export const TYPE_DEFS_PATH =
  path.join(SERVER_PATH, "apollo", "typeDefs.graphql")
