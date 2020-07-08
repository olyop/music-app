import { map } from "lodash/fp"
import { QueryResult } from "pg"
import { pipe } from "@oly_op/pipe"

import { resRows } from "./resRows"
import { convertToCamelCase } from "../resolver"

export const parseTable = <T>() => (res: QueryResult): T[] =>
	pipe(resRows, map(convertToCamelCase<T>()))(res)