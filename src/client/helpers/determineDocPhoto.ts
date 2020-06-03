import { toString } from "lodash"

export const determineDocPhoto = <T, K extends keyof T>(doc: T): string => {
	const key = ("cover" in doc ? "cover" : "photo") as K
	return toString(doc[key])
}