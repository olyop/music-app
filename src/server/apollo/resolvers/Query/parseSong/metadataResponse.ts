import { Song, Album } from "../../../../types"

interface MetadataAlbum extends Omit<Album, "albumId" | "dateAdded"> {
	cover: string,
	artists: string[],
}

export interface MetadataResponse extends Omit<Song, "songId" | "albumId" | "dateAdded"> {
	genres: string[],
	artists: string[],
	remixers: string[],
	featuring: string[],
	album: MetadataAlbum,
}