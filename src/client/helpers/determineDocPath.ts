import { determineDocId } from "./determineDocId"
import { determineDocType } from "./determineDocType"

export const determineDocPath = <T>(doc: T): string =>
	`/${(determineDocType(doc)).slice(0, -2)}/${determineDocId(doc)}`