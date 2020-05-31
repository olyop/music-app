import { Doc } from "../types"

const determineDocIdKey = (doc: Doc): string =>
	Object.keys(doc)
		.filter((key) => key.includes("Id"))
		.shift()!

export default determineDocIdKey