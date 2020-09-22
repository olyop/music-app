import pipe from "@oly_op/pipe"
import { isEmpty } from "lodash"

import { resRows } from "./resRows"
import { SqlQueryRes } from "../../types"

export const isResEmpty = (res: SqlQueryRes) =>
	pipe(resRows, isEmpty)(res)