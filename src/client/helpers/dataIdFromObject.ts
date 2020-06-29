import { IdGetterObj } from "apollo-cache-inmemory"

import { determineDocId } from "./determineDocId"

export const dataIdFromObject =
	(doc: IdGetterObj) => determineDocId(doc)