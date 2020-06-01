/* eslint-disable prefer-template */
import { Doc } from "../types"
import determineDocIdKey from "./determineDocIdKey"

export const determineDocPath = (doc: Doc): string =>
	("/" + determineDocIdKey(doc))
		.slice(0, -2)
		.concat("/")
		.concat(doc[determineDocIdKey(doc)])