import pg from "../../services/pg"
import { sqlBaseQuery } from "./sqlBaseQuery"

type TInput = {
	query: string,
}

export const sqlQuery = (config: TInput) =>
	new Promise(
		(resolve, reject) => {
			sqlBaseQuery(pg)(config)
				.then(resolve)
				.catch(reject)
		},
	)