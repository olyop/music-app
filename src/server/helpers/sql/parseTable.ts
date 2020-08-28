import pipe from "@oly_op/pipe"
import { map } from "lodash/fp"

import { resRows } from "./resRows"
import { SQLQueryResult } from "../../types"
import { convertToCamelCase } from "../resolver"

export const parseTable = <T>() => (res: SQLQueryResult): T[] =>
	pipe(resRows, map(convertToCamelCase<T>()))(res)