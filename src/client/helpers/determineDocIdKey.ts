import { Doc } from "../types"

export const determineDocIdKey = (doc: Doc): string =>
	Object.keys(doc)
		.filter((key) => key.includes("Id"))
		.shift()!