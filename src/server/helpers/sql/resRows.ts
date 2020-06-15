import { QueryResult } from "pg"

export const resRows = ({ rows }: QueryResult<Record<string, unknown>>) => rows