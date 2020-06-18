import { Song, Album } from "../../../../types"

interface MetadataAlbum extends Omit<Album, "albumId" | "dateCreated"> {
	cover: string,
	artists: string[],
}

export interface MetadataResponse extends Omit<Song, "songId" | "albumId" | "dateCreated"> {
	genres: string[],
	artists: string[],
	remixers: string[],
	featuring: string[],
	album: MetadataAlbum,
}