import { SongBase, AlbumBase, ArtistBase } from "@oly_op/music-app-types"

export type Artist = Omit<ArtistBase, "artistId">

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
	album: AlbumParsed,
}

export type HandleFiles =
	(files: FileList) => void

export type HandleSongRemove =
	(albumId: string, songId: string) => void

export type HandleAlbumChange =
	(albumId: string, val: string | number | string[], key: keyof Album) => void

export interface State {
	albums: Album[],
	loading: boolean,
	handleFiles: HandleFiles,
	handleSongRemove: HandleSongRemove,
	handleAlbumChange: HandleAlbumChange,
}