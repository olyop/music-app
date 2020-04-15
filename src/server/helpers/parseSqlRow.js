import head from "lodash/head.js"
import isUndefined from "lodash/isUndefined.js"
import { pipe, convertToCamelCase } from "./index.js"

const parseSqlTable = sql => pipe(sql)(
  ({ rows }) => rows,
  head,
  val => isUndefined(val) ? [] : val,
  convertToCamelCase,
)

export default parseSqlTable
