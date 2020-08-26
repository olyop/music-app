/* eslint-disable no-restricted-syntax */
import { pg } from "../../services"
import { SQLConfig } from "../../types"
import { baseQuery } from "./baseQuery"

export const transaction = async (configs: (string | SQLConfig<unknown>)[]) => {
	const client = await pg.connect()
	try {
		await client.query("BEGIN")
		const results: unknown[] = []
		const queries = configs.map(baseQuery(client))
		for await (const res of queries) { results.push(res) }
		await client.query("COMMIT")
		return results
	} catch (error) {
		await client.query("ROLLBACK")
		throw error
	} finally {
		client.release()
	}
}