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

export interface State {
	albums: Album[],
	loading: boolean,
	handleFiles: (files: FileList) => void,
	handleSongRemove: (albumId: string, songId: string) => void,
	handleAlbumTitleChange: (albumId: string, title: string) => void,
	handleAlbumReleasedChange: (albumId: string, released: number) => void,
}