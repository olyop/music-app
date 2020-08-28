import pipe from "@oly_op/pipe"
import { isEmpty } from "lodash"
import { resRows } from "./resRows"
import { SQLQueryResult } from "../../types"

export const isResEmpty = (res: SQLQueryResult) =>
	pipe(resRows, isEmpty)(res)