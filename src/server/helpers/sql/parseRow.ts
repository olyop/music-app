import pipe from "@oly_op/pipe"
import { isUndefined } from "lodash"

import { resRows } from "./resRows"
import { SqlQueryRes } from "../../types"
import { convertToCamelCase } from "../resolver"

const checkForNullResult = (res: Record<string, unknown>[]) =>
	(isUndefined(res) ? [] : res)

export const parseRow = <T>() => (res: SqlQueryRes) =>
	pipe(
		resRows,
		checkForNullResult,
		obj => obj[0],
		convertToCamelCase<T>(),
	)(res)