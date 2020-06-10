import { isEmpty } from "lodash"
import { QueryResult } from "pg"

import { pipe } from "../utils/pipe"
import { sqlResRows } from "./sqlResRows"

export const sqlIsResEmpty = (res: QueryResult) =>
	pipe(sqlResRows, isEmpty)(res)