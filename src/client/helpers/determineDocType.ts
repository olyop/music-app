import toString from "lodash/toString"

import { Doc } from "../types"

export const determineDocType = <T extends Doc, K extends keyof T>(doc: T): string => {
	const key = "__typename" as K
	return toString(doc[key]).toLowerCase()
}