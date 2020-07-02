import { isEmpty } from "lodash"
import { QueryResult } from "pg"
import { pipe } from "@oly_op/pipe"
import { resRows } from "./resRows"

export const isResEmpty = (res: QueryResult) =>
	pipe(resRows, isEmpty)(res)