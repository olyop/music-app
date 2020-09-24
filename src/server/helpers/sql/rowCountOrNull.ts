import { SqlQueryRes } from "../../types"

export const rowCountOrNull =
	({ rowCount }: SqlQueryRes) => (rowCount === 0 ? null : rowCount)