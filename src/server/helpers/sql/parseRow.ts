import { QueryResult } from "pg"
import { isUndefined } from "lodash"

import { pipe } from "../utils"
import { resRows } from "./resRows"
import { convertToCamelCase } from "../resolver"

const head = <T>(arr: T[]) =>
	arr[0]

const checkForNullResult = <T>(res: T[]) =>
	(isUndefined(res) ? [] : res)

export const parseRow = <T>(res: QueryResult) =>
	pipe(
		resRows,
		checkForNullResult,
		head,
		val => convertToCamelCase<T>(val),
	)(res)