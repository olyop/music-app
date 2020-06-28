import { determineDocId } from "./determineDocId"

export const dataIdFromObject =
	<T>(doc: T) => determineDocId(doc)