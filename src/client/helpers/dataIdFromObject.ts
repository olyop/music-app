import { Doc } from "../types"
import { determineDocId } from "./determineDocId"

export const dataIdFromObject =
	<T extends Doc>(doc: T) => determineDocId(doc)