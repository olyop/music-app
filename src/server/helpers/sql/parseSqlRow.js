import head from "lodash/head.js"
import isUndefined from "lodash/isUndefined.js"
import { pipe, getRowsFromRes, convertToCamelCase } from "../index.js"

const checkForNullResult = val => isUndefined(val) ? [] : val

const parseSqlTable = sql => pipe(sql)(
  getRowsFromRes,
  checkForNullResult,
  head,
  convertToCamelCase,
)

export default parseSqlTable
