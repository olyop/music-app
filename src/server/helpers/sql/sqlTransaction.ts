/* eslint-disable promise/no-nesting */
import pg from "../../services/pg.js"
import { SQLConfig } from "../../types"
import { sqlBaseQuery } from "./sqlBaseQuery"

export const sqlTransaction = <TReturn>(configs: (string | SQLConfig<TReturn>)[]) =>
	new Promise(
		(resolve, reject) => {
			pg.connect(
				(connectErr, client) => {
					if (connectErr) reject(connectErr)
					let temp: unknown
					// eslint-disable-next-line promise/catch-or-return
					client
						.query("BEGIN")
						.then(() => configs.map(sqlBaseQuery<TReturn>(client)))
						.then(result => {
							temp = result
							return client.query("COMMIT")
						})
						.catch(queryError => {
							reject(queryError)
							return client.query("ROLLBACK")
						})
						.then(() => resolve(temp))
						.catch(reject)
						.finally(() => client.release())
				},
			)
		},
	)