import path from "path"
import importSql from "./importSql.js"
import isResEmpty from "./isResEmpty.js"
import queryDatabase from "./queryDatabase.js"
import { SQL_FOLER_PATH } from "../../globals.js"

const isColumnUnique = (column, value, table) =>
  queryDatabase({
    parse: isResEmpty,
    variables: { value, column, table },
    query: importSql(path.join(SQL_FOLER_PATH, "selects", "where.sql")),
  })

export default isColumnUnique
