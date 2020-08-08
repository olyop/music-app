import { IAudioMetadata } from "music-metadata-browser"

import determineSong from "./determineSong"
import { orderAlbums } from "./orderAlbums"
import { songsToAlbums } from "./songsToAlbums"

export const parseMetadata = (files: File[]) => (metadata: IAudioMetadata[]) => {
	const songs = metadata.map((res, index) => determineSong(files[index], res))
	return orderAlbums(songsToAlbums(songs))
}