import { head, isUndefined } from "lodash"

import pipe from "../utils/pipe.js"
import sqlResRows from "./sqlResRows.js"
import convertToCamelCase from "../resolver/convertToCamelCase.js"

const checkForNullResult = res => (isUndefined(res) ? [] : res)

export const sqlParseRow = sql => pipe(
  sqlResRows,
  checkForNullResult,
  head,
  convertToCamelCase,
)(sql)