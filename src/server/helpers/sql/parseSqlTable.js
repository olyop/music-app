import map from "lodash/fp/map.js"
import { pipe, getRowsFromRes, convertToCamelCase } from "../index.js"

const parseSqlTable = sql => pipe(sql)(
  getRowsFromRes,
  map(convertToCamelCase),
)

export default parseSqlTable
