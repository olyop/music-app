import { IdGetterObj } from "apollo-cache-inmemory"

import { Doc } from "../types"
import { determineDocId } from "./determineDocId"

export const dataIdFromObject =
	(doc: IdGetterObj) => determineDocId(doc as Doc)