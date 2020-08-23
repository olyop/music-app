import type { IAudioMetadata } from "music-metadata-browser"
import type { SongBase, AlbumBase, GenreBase, ArtistBase } from "@oly_op/music-app-types"

export interface Artist extends ArtistBase {
	photo: Blob | null,
}

export interface Album extends Omit<AlbumBase, "released"> {
	songs: Song[],
	released: Date,
	artists: string[],
	cover: Blob | null,
}

export type Genre = GenreBase

export interface Song extends SongBase {
	audio: File,
	genres: string[],
	artists: string[],
	remixers: string[],
	featuring: string[],
}

export type HandleFiles =
	(files: FileList) => void

export type HandleSongRemove =
	(albumId: string, songId: string) => void

export type HandleSongChange =
	(albumId: string, songId: string, val: Song[keyof Song], key: keyof Song) => void

export type HandleAlbumChange =
	(albumId: string, val: Album[keyof Album], key: keyof Album) => void

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

export interface TempSong {
	audio: File,
	metadata: IAudioMetadata,
}