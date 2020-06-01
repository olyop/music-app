import { Doc } from "../types"

export const determineDocNameKey = (doc: Doc): "title" | "name" =>
	("name" in doc ? "title" : "name")