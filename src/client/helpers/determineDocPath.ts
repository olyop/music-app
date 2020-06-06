import { determineDocId } from "./determineDocId"
import { determineDocType } from "./determineDocType"

export const determineDocPath = <T>(doc: T): string =>
	`/${determineDocType(doc)}/${determineDocId(doc)}`