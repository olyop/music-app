import { SqlQueryRes } from "../../types"

export const sqlRowCountOrNull =
	({ rowCount }: SqlQueryRes) => (rowCount === 0 ? null : rowCount)