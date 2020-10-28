import { pg } from "../../services"
import { sqlQuery } from "./sqlQuery"
import { SqlQueryInput } from "../../types"

export const sqlPoolQuery = <T>(config: SqlQueryInput<T>): Promise<T> =>
	sqlQuery(pg)<T>(config)