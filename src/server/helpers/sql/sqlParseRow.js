import head from "lodash/head.js"
import isUndefined from "lodash/isUndefined.js"

import pipe from "../utils/pipe.js"
import sqlResRows from "./sqlResRows.js"
import convertToCamelCase from "../resolver/convertToCamelCase.js"

const checkForNullResult = res => (isUndefined(res) ? [] : res)

const parseSqlRow = sql => pipe(sql)(
  sqlResRows,
  checkForNullResult,
  head,
  convertToCamelCase,
)

export default parseSqlRow
