import { SQLQueryResult } from "../../types"

interface ExistsRow {
	exists: boolean,
}

export const resExists = ({ rows }: SQLQueryResult<ExistsRow>) =>
	rows[0].exists