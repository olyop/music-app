import { toString } from "lodash"

import { Doc } from "../types"

export const determineDocName = <T extends Doc>(doc: T) =>
	toString(doc["name" in doc ? "name" : "title"])