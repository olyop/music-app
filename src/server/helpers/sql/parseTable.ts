import pipe from "@oly_op/pipe"
import { map } from "lodash/fp"
import { resRows } from "./resRows"
import { SqlQueryRes } from "../../types"
import { convertToCamelCase } from "../resolver"

export const parseTable =
	<T>(log = false) =>
		(res: SqlQueryRes): T[] =>
			pipe(
				resRows,
				map(convertToCamelCase<T>()),
				rows => {
					if (log) console.log(rows)
					return rows
				},
			)(res)