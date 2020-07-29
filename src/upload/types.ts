import {
	SongBase,
	GenreBase,
	AlbumBase,
	ArtistBase,
} from "@oly_op/music-app-types"

export type Genre = Omit<GenreBase, "genreId">
export type Artist = Omit<ArtistBase, "artistId">

export interface Album extends Omit<AlbumBase, "albumId"> {
	artists: string[],
	cover: string | null,
}

export interface AlbumWithSongs extends Album {
	songs: Song[],
}

export interface Song extends Omit<SongBase, "songId"> {
	album: Album,
	genres: string[],
	artists: string[],
	remixers: string[],
	featuring: string[],
}

export interface State {
	songs: Song[],
	loading: boolean,
	handleFiles: (files: FileList) => void,
}