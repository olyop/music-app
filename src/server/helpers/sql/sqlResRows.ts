import { QueryResult } from "pg"

export const sqlResRows = ({ rows }: QueryResult<Record<string, unknown>>) => rows