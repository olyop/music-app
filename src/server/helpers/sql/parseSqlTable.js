import map from "lodash/fp/map.js"

import pipe from "../utils/pipe.js"
import getRowsFromRes from "./getRowsFromRes.js"
import convertToCamelCase from "./convertToCamelCase.js"

const parseSqlTable = sql => pipe(sql)(
  getRowsFromRes,
  map(convertToCamelCase),
)

export default parseSqlTable
