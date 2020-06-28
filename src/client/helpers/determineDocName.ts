import { toString } from "lodash"

type InputDoc = {
	name?: string,
	title?: string,
}

export const determineDocName = <T extends InputDoc>(doc: T) =>
	toString(doc["name" in doc ? "name" : "title"])