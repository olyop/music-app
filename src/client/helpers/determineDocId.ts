import { IdGetterObj, defaultDataIdFromObject } from "apollo-cache-inmemory"

export const determineDocId = (doc: IdGetterObj) => (
	doc.__typename ?
		`${doc.__typename.toLowerCase()}Id` :
		defaultDataIdFromObject(doc)
)