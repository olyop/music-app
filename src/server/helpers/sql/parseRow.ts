import { QueryResult } from "pg"
import { isUndefined } from "lodash"

import { pipe } from "../utils"
import { resRows } from "./resRows"
import { convertToCamelCase } from "../resolver"

const checkForNullResult = <T>(res: T[]) =>
	(isUndefined(res) ? [] : res)

export const parseRow = <T>(res: QueryResult) =>
	(pipe(
		resRows,
		checkForNullResult,
		rows => rows[0],
		convertToCamelCase,
	)(res) as unknown) as T