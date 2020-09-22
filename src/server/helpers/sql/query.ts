import { pg } from "../../services"
import { baseQuery } from "./baseQuery"
import { SqlConfig } from "../../types"

export const query = <TReturn>(config: SqlConfig<TReturn>): Promise<TReturn> =>
	baseQuery(pg)<TReturn>(config)