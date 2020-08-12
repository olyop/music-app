import type { SongBase, AlbumBase, GenreBase, ArtistBase } from "@oly_op/music-app-types"

export interface Song extends SongBase {
	audio: Blob,
	genres: string[],
	artists: string[],
	remixers: string[],
	featuring: string[],
}

export type Genre = GenreBase

export interface Album extends AlbumBase {
	songs: Song[],
	artists: string[],
	cover: Blob | null,
}

export interface Artist extends ArtistBase {
	photo: Blob | null,
}

export interface SongUpload extends Omit<Song, "songId"> {
	album: string,
}

export type GenreUpload = Omit<Genre, "genreId">

export interface AlbumUpload extends Omit<AlbumBase, "albumId"> {
	cover: Blob,
	artists: string[],
}

export interface ArtistUpload extends Omit<ArtistBase, "artistId"> {
	photo: Blob,
}

export type HandleFiles =
	(files: FileList) => void

export type HandleSongRemove =
	(albumId: string, songId: string) => void

export type HandleSongChange =
	(albumId: string, songId: string, val: string | number | string[], key: keyof Song) => void

export type HandleAlbumChange =
	(albumId: string, val: string | string[] | number | Blob, key: keyof Album) => void

export type HandleArtistPhotoChange =
	(artistId: string) => (photo: Blob) => void

export interface State {
	albums: Album[],
	genres: Genre[],
	loading: boolean,
	artists: Artist[],
	handleSubmit: () => void,
	handleFiles: HandleFiles,
	handleSongRemove: HandleSongRemove,
	handleSongChange: HandleSongChange,
	handleAlbumChange: HandleAlbumChange,
	handleArtistPhotoChange: HandleArtistPhotoChange,
}