import { map } from "lodash/fp"
import { QueryResult } from "pg"

import { resRows } from "./resRows"
import { pipe } from "../utils/pipe"
import { convertToCamelCase } from "../resolver/convertToCamelCase"

export const parseTable = <T>(res: QueryResult): T[] =>
	pipe(resRows, map(convertToCamelCase))(res)