import head from "lodash/head.js"
import isUndefined from "lodash/isUndefined.js"

import pipe from "../utils/pipe.js"
import getRowsFromRes from "./getRowsFromRes.js"
import convertToCamelCase from "./convertToCamelCase.js"

const checkForNullResult = val => (isUndefined(val) ? [] : val)

const parseSqlRow = sql => pipe(sql)(
  getRowsFromRes,
  checkForNullResult,
  head,
  convertToCamelCase,
)

export default parseSqlRow
