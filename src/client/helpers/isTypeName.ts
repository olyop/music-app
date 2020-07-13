import { Doc, Song } from "../types"

export const isSong = (doc: Doc): doc is Song =>
	doc.__typename === "Song"