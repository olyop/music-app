/* eslint-disable no-restricted-syntax */
import { pg } from "../../services"
import { SqlConfig } from "../../types"
import { baseQuery } from "./baseQuery"

type Input = (string | SqlConfig<unknown>)[]

export const transaction = async (configs: Input) => {
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