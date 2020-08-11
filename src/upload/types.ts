import { SongBase, AlbumBase, GenreBase, ArtistBase } from "@oly_op/music-app-types"

export type Genre = GenreBase

export interface Artist extends ArtistBase {
	photo: string | null,
}

export interface Song extends SongBase {
	genres: string[],
	artists: string[],
	remixers: string[],
	featuring: string[],
}

export interface Album extends AlbumBase {
	songs: Song[],
	artists: string[],
	cover: string | null,
}

export type AlbumParsed = Omit<Album, "albumId" | "songs">

export interface SongParsed extends Omit<Song, "album"> {
	audio: File,
	album: AlbumParsed,
}

export type HandleFiles =
	(files: FileList) => void

export type HandleSongRemove =
	(albumId: string, songId: string) => void

export type HandleSongChange =
	(albumId: string, songId: string, val: string | number | string[], key: keyof Song) => void

export type HandleAlbumChange =
	(albumId: string, val: string | number | string[], key: keyof Album) => void

export type HandleArtistPhotoChange =
	(artistId: string) => (dataUrl: string) => void

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