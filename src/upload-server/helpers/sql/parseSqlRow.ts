import pipe from "@oly_op/pipe"
import { isUndefined } from "lodash"

import { SqlQueryRes } from "../../types"
import { getSqlResRows } from "./getSqlResRows"
import { convertToCamelCase } from "../resolver/convertToCamelCase"

const checkForNullResult = (res: Record<string, unknown>[]) =>
	(isUndefined(res) ? [] : res)

export const parseSqlRow = <T>() => (res: SqlQueryRes) =>
	pipe(
		getSqlResRows,
		checkForNullResult,
		obj => obj[0],
		convertToCamelCase<T>(),
	)(res)