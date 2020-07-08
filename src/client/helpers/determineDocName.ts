import toString from "lodash/toString"

import { Doc } from "../types"

interface Input extends Doc {
	name?: string,
	title?: string,
}

export const determineDocName = <T extends Input>(doc: T) =>
	toString(doc["name" in doc ? "name" : "title"])