import map from "lodash/fp/map.js"

import pipe from "../utilities/pipe.js"
import getRowsFromRes from "./sqlGetRowsFromRes.js"
import convertToCamelCase from "../resolver/convertToCamelCase.js"

const sqlParseTable = sql => pipe(sql)(
  getRowsFromRes,
  map(convertToCamelCase),
)

export default sqlParseTable
