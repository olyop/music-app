import pipe from "@oly_op/pipe"
import { isEmpty } from "lodash"

import { SqlQueryRes } from "../../types"
import { getSqlResRows } from "./getSqlResRows"

export const isSqlResEmpty =
	(res: SqlQueryRes) =>
		pipe(getSqlResRows, isEmpty)(res)