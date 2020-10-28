import { SqlQueryRes } from "../../types"
import { getSqlResRows } from "./getSqlResRows"

export const getSqlResExists = (res: SqlQueryRes) =>
	getSqlResRows(res)[0].exists as boolean