import { parseRow, QueryRes } from "@oly_op/pg-helpers"

import { UserDoc } from "../../types"

export const parseSqlUnixField =
	(res: QueryRes) =>
		(res.rowCount === 0 ?
			null : parseRow<UserDoc>()(res).dateAdded * 1000)