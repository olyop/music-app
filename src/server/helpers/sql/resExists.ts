import { QueryResult } from "pg"

interface ExistsRow {
	exists: boolean,
}

export const resExists = ({ rows }: QueryResult<ExistsRow>) =>
	rows[0].exists