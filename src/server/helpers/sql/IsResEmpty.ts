import pipe from "@oly_op/pipe"
import { isEmpty } from "lodash"

import { resRows } from "./resRows"
import { SQLQueryRes } from "../../types"

export const isResEmpty = (res: SQLQueryRes) =>
	pipe(resRows, isEmpty)(res)