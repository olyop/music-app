import { QueryResult } from "pg"

export const rowCount = (res: QueryResult) =>
	res.rowCount