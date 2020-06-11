import { QueryResult } from "pg"
import { isUndefined } from "lodash"

import { pipe } from "../utils"
import { sqlResRows } from "./sqlResRows"
import { convertToCamelCase } from "../resolver"

const checkForNullResult = <T>(res: T[]) =>
	(isUndefined(res) ? [] : res)

export const sqlParseRow = <T>(res: QueryResult) =>
	(pipe(
		sqlResRows,
		checkForNullResult,
		rows => rows[0],
		convertToCamelCase,
	)(res) as unknown) as T