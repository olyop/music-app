import { toString } from "lodash"

export const determineDocType = <T, K extends keyof T>(doc: T): string => {
	const key = "__typename" as K
	return toString(doc[key]).toLowerCase()
}