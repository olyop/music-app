import head from "lodash/head.js"
import isUndefined from "lodash/isUndefined.js"

import pipe from "../utilities/pipe.js"
import sqlGetRowsFromRes from "./sqlGetRowsFromRes.js"
import convertToCamelCase from "../resolver/convertToCamelCase.js"

const checkForNullResult = res => (isUndefined(res) ? [] : res)

const parseSqlRow = sql => pipe(sql)(
  sqlGetRowsFromRes,
  checkForNullResult,
  head,
  convertToCamelCase,
)

export default parseSqlRow
