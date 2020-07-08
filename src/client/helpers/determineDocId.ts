import { Doc } from "../types"
import { determineDocIdKey } from "./determineDocIdKey"

export const determineDocId = <T extends Doc>(doc: T) =>
	(doc[determineDocIdKey(doc)] as unknown) as string