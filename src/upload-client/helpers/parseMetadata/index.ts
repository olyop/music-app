import { TempSong } from "../../types"
import determineSong from "./determineSong"
import { orderAlbums } from "./orderAlbums"
import { songsToAlbums } from "./songsToAlbums"

export const parseMetadata = (metadata: TempSong[]) => {
	const songs = metadata.map(determineSong)
	return orderAlbums(songsToAlbums(songs))
}