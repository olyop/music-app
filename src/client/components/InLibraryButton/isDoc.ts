import { Album, Artist, UserDoc } from "../../types"

export const isAlbum = (doc: UserDoc): doc is Album =>
	doc.__typename === "Album"

export const isArtist = (doc: UserDoc): doc is Artist =>
	doc.__typename === "Artist"