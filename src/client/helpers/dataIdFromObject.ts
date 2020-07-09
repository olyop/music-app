import { IdGetterObj } from "@apollo/client"

import { Doc } from "../types"
import { determineDocId } from "./determineDocId"

export const dataIdFromObject =
	(doc: IdGetterObj) => determineDocId(doc as Doc)