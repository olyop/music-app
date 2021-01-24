import { parseSqlRow } from "./parseSqlRow"
import { UserDoc, SqlQueryRes } from "../../types"

export const parseSqlUnixField =
	(res: SqlQueryRes) =>
		(res.rowCount === 0 ?
			null : parseSqlRow<UserDoc>()(res).dateAdded * 1000)