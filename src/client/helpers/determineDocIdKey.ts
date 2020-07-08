import { defaultDataIdFromObject } from "apollo-cache-inmemory"

import { Doc } from "../types"

export const determineDocIdKey = <T extends Doc>(doc: T) =>
	((doc.__typename ?
		`${doc.__typename.toLowerCase()}Id` :
		defaultDataIdFromObject(doc)!) as unknown) as keyof T