import { defaultDataIdFromObject } from "apollo-cache-inmemory"
import { Doc } from "../types"

export const determineDocId = <T extends Doc>(doc: T): string => (
	doc.__typename ?
		`${doc.__typename.toLowerCase()}Id` :
		defaultDataIdFromObject(doc)!
)