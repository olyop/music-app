import type { FileUpload } from "graphql-upload"
import type { SongBase, AlbumBase, GenreBase, ArtistBase } from "@oly_op/music-app-types"

export type Check = {
	name: string,
	check: Promise<boolean>,
}

export interface CheckRes {
	name: string,
	check: boolean,
}

export interface Input {
	genres: GenreInput[],
	albums: AlbumInput[],
	artists: ArtistInput[],
}

export interface Upload {
	genres: GenreInput[],
	albums: AlbumUpload[],
	artists: ArtistUpload[],
}

export interface ArtistInput extends Omit<ArtistBase, "artistId"> {
	photo: Promise<FileUpload>,
}

export type GenreInput = Omit<GenreBase, "genreId">

export interface AlbumInput extends Omit<AlbumBase, "albumId"> {
	released: Date,
	artists: string[],
	songs: SongInput[],
	cover: Promise<FileUpload>,
}

export interface SongInput extends Omit<SongBase, "songId" | "duration"> {
	genres: string[],
	artists: string[],
	remixers: string[],
	featuring: string[],
	audio: Promise<FileUpload>,
}

export interface ArtistUpload extends Omit<ArtistInput, "photo"> {
	photo: Buffer,
}

export interface AlbumUpload extends Omit<AlbumInput, "cover" | "songs"> {
	cover: Buffer,
	songs: SongUpload[],
}

export interface SongUpload extends Omit<SongInput, "audio"> {
	audio: Buffer,
}