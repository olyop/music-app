import { QueryResult } from "pg"

interface Row {
	exists: boolean,
}

export const resExists = ({ rows }: QueryResult<Row>) =>
	rows[0].exists