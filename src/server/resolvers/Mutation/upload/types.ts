import type { FileUpload } from "graphql-upload"
import type { SongBase, AlbumBase, GenreBase, ArtistBase } from "@oly_op/music-app-types"

export interface Input {
	songs: SongInput[],
	genres: GenreInput[],
	albums: AlbumInput[],
	artists: ArtistInput[],
}
export interface ArtistInput extends Omit<ArtistBase, "artistId"> {
	photo: Promise<FileUpload>,
}

export type GenreInput = Omit<GenreBase, "genreId">

export interface AlbumInput extends Omit<AlbumBase, "albumId"> {
	artists: string[],
	cover: Promise<FileUpload>,
}

export interface SongInput extends Omit<SongBase, "songId" | "duration"> {
	album: string,
	genres: string[],
	artists: string[],
	remixers: string[],
	featuring: string[],
	audio: Promise<FileUpload>,
}

export interface ArtistUpload extends Omit<ArtistInput, "photo"> {
	photo: Buffer,
}

export interface AlbumUpload extends Omit<AlbumInput, "cover"> {
	cover: Buffer,
}

export interface SongUpload extends Omit<SongInput, "audio"> {
	audio: Buffer,
}