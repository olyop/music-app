import { IAudioMetadata } from "music-metadata-browser"

import determineSong from "./determineSong"
import { orderAlbums } from "./orderAlbums"
import { songsToAlbums } from "./songsToAlbums"

export const parseMetadata = (metadata: IAudioMetadata[]) => {
	const songs = metadata.map(determineSong)
	return orderAlbums(songsToAlbums(songs))
}