import toString from "lodash/toString"

import { Doc } from "../types"

export const determineDocName =
	<T extends Input>(doc: T) =>
		toString(doc["name" in doc ? "name" : "title"])

interface Input extends Doc {
	name?: string,
	title?: string,
}