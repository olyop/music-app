import { toString } from "lodash"

type TInput<K> = {
	includes: (val: string) => K,
}

export const determineDocId = <T, K extends keyof T & TInput<K>>(doc: T): string => {
	const keys = Object.keys(doc) as K[]
	const key = keys.filter(k => k.includes("Id")).shift()!
	return toString(doc[key])
}