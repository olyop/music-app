import pipe from "@oly_op/pipe"
import { isUndefined } from "lodash"

import { resRows } from "./resRows"
import { SQLQueryResult } from "../../types"
import { convertToCamelCase } from "../resolver"

const checkForNullResult = <T>(res: T[]) =>
	(isUndefined(res) ? [] : res)

export const parseRow = <T>() => (res: SQLQueryResult) =>
	pipe(
		resRows,
		checkForNullResult,
		obj => obj[0],
		convertToCamelCase<T>(),
	)(res)