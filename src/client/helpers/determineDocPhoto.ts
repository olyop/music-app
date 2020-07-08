import toString from "lodash/toString"

import { Doc } from "../types"

export const determineDocPhoto = <T extends Doc, K extends keyof T>(doc: T): string => {
	const key = ("cover" in doc ? "cover" : "photo") as K
	return toString(doc[key])
}