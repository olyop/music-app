import pg from "../../services/pg"
import { SQLConfig } from "../../types"
import { sqlBaseQuery } from "./sqlBaseQuery"

export const sqlQuery = <TReturn>(config: SQLConfig<TReturn>) =>
	sqlBaseQuery<TReturn>(pg)(config)