import { SqlQueryRes } from "../../types"

export const getSqlRowCountOrNull =
	({ rowCount }: SqlQueryRes) => (rowCount === 0 ? null : rowCount)