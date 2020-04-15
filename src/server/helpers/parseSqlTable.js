import map from "lodash/fp/map.js"
import { pipe, convertToCamelCase } from "./index.js"

const parseSqlTable = sql => pipe(sql)(
  ({ rows }) => rows,
  map(convertToCamelCase),
)

export default parseSqlTable
