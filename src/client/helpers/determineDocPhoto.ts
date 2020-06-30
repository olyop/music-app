import { toString } from "lodash"
import { UserDoc } from "../types"

export const determineDocPhoto = <T extends UserDoc, K extends keyof T>(doc: T): string => {
	const key = ("cover" in doc ? "cover" : "photo") as K
	return toString(doc[key])
}