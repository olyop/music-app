import { SQLQueryResult } from "../../types"

export const rowCount = (res: SQLQueryResult) =>
	res.rowCount