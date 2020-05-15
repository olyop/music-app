import map from "lodash/fp/map.js"

import pipe from "../utils/pipe.js"
import sqlResRows from "./sqlResRows.js"
import convertToCamelCase from "../resolver/convertToCamelCase.js"

const sqlParseTable = sql => pipe(sql)(
  sqlResRows,
  map(convertToCamelCase),
)

export default sqlParseTable
