import { parseRow } from "./parseRow"
import { UserDoc, SqlQueryRes } from "../../types"

export const parseUnixField =
	(res: SqlQueryRes) =>
		(res.rowCount === 0 ?
			null : parseRow<UserDoc>()(res).dateAdded * 1000)