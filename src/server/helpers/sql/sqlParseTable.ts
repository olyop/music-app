import { map } from "lodash/fp"
import { QueryResult } from "pg"

import { pipe } from "../utils/pipe"
import { sqlResRows } from "./sqlResRows"
import { convertToCamelCase } from "../resolver/convertToCamelCase"

export const sqlParseTable = <T>(res: QueryResult) =>
	(pipe(sqlResRows, map(convertToCamelCase))(res) as unknown) as T[]