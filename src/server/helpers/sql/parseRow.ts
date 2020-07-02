import { QueryResult } from "pg"
import { pipe } from "@oly_op/pipe"
import { head, isUndefined } from "lodash"

import { resRows } from "./resRows"
import { convertToCamelCase } from "../resolver"

const checkForNullResult = <T>(res: T[]) =>
	(isUndefined(res) ? [] : res)

export const parseRow = <T>(res: QueryResult) =>
	pipe(
		resRows,
		checkForNullResult,
		head,
		val => convertToCamelCase<T>(val!),
	)(res)