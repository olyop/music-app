import { pg } from "../../services"
import { sqlQuery } from "./sqlQuery"
import { SqlQueryInput } from "../../types"

export const sqlTransaction = async (configs: (string | SqlQueryInput<unknown>)[]) => {
	const client = await pg.connect()
	try {
		await client.query("BEGIN")
		const results: unknown[] = []
		const queries = configs.map(sqlQuery(client))
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