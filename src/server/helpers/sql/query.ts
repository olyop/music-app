import pg from "../../services/pg"
import { baseQuery } from "./baseQuery"
import { SQLConfig } from "../../types"

export const query = <TReturn>(config: SQLConfig<TReturn>): Promise<TReturn> =>
	baseQuery<TReturn>(pg)(config)