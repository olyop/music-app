import { isEmpty } from "lodash"
import { QueryResult } from "pg"

import { pipe } from "../utils/pipe"
import { sqlResRows } from "./sqlResRows"

export const isResEmpty = (res: QueryResult) =>
	pipe(sqlResRows, isEmpty)(res)