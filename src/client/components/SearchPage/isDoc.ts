import { Doc, Song, Genre, Album, Artist } from "../../types"

export const isSong = (doc: Doc): doc is Song =>
	doc.__typename === "Song"

export const isGenre = (doc: Doc): doc is Genre =>
	doc.__typename === "Genre"

export const isAlbum = (doc: Doc): doc is Album =>
	doc.__typename === "Album"

export const isArtist = (doc: Doc): doc is Artist =>
	doc.__typename === "Artist"