/* eslint-disable promise/no-nesting */
import { pg } from "../../services"
import { SQLConfig } from "../../types"
import { baseQuery } from "./baseQuery"

export const transaction = (configs: (string | SQLConfig)[]) =>
	new Promise<unknown[]>(
		(resolve, reject) => {
			pg.connect(
				(connectErr, client) => {
					if (connectErr) reject(connectErr)
					let temp: unknown[]
					// eslint-disable-next-line promise/catch-or-return
					client
						.query("BEGIN")
						.then(() => configs.map(baseQuery(client)))
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