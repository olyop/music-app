import { isEmpty } from "lodash"
import { QueryResult } from "pg"

import { resRows } from "./resRows"
import { pipe } from "../utils/pipe"

export const isResEmpty = (res: QueryResult) =>
	pipe(resRows, isEmpty)(res)