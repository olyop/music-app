import pipe from "@oly_op/pipe"
import { map } from "lodash/fp"

import { SqlQueryRes } from "../../types"
import { getSqlResRows } from "./getSqlResRows"
import { convertToCamelCase } from "../resolver/convertToCamelCase"

export const parseSqlTable =
	<T>(log = false) =>
		(res: SqlQueryRes): T[] =>
			pipe(
				getSqlResRows,
				map(convertToCamelCase<T>()),
			)(res)