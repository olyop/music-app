import { toString } from "lodash"

export const determineDocName = <T, K extends keyof T>(doc: T): string => {
	const key = ("name" in doc ? "name" : "title") as K
	return toString(doc[key])
}