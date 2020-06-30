import { Doc } from "../types"
import { determineDocId } from "./determineDocId"
import { determineDocType } from "./determineDocType"

export const determineDocPath = <T extends Doc>(doc: T): string =>
	`/${determineDocType(doc)}/${determineDocId(doc)}`