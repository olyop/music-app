import { Doc } from "../types"
import { uuidRemoveDashes } from "./uuidDashes"
import { determineDocId } from "./determineDocId"
import { determineDocType } from "./determineDocType"

export const determineDocPath =
	<T extends Doc>(doc: T): string =>
		`/${determineDocType(doc)}/${uuidRemoveDashes(determineDocId(doc))}`