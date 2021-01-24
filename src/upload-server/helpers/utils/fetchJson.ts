import nodeFetch from "node-fetch"

export const fetchJson =
	async <T>(url: string) => {
		const data = await nodeFetch(url)
		return (data.json() as unknown) as T
	}