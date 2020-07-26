import { ChangeEventHandler } from "react"
import { SongBase, AlbumBase } from "@oly_op/music-app-common"

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
}

export interface State {
	songs: Song[],
	loading: boolean,
	handleFiles: ChangeEventHandler<HTMLInputElement>,
}