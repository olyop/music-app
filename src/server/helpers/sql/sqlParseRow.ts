import { head, isUndefined } from "lodash"

import { pipe } from "../utils"
import { sqlResRows } from "./sqlResRows"
import { convertToCamelCase } from "../resolver"

const checkForNullResult = <T>(res: T[]) =>
	(isUndefined(res) ? [] : res)

export const sqlParseRow = (sql: string) =>
	pipe(
		sqlResRows,
		checkForNullResult,
		head,
		convertToCamelCase,
	)(sql)