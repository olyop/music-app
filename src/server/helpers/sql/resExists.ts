import { QueryResult } from "pg"

export const resExists = ({ rows }: QueryResult<{ exists: boolean }>) =>
	rows[0].exists