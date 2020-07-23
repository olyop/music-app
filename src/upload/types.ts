import { ChangeEventHandler } from "react"
import { SongBase, AlbumBase } from "@oly_op/music-app-common"

export interface Album extends Omit<AlbumBase, "albumId"> {}

export interface Song extends Omit<SongBase, "songId"> {
	album: Album,
}

export interface State {
	songs: Song[],
	loading: boolean,
	handleFiles: ChangeEventHandler<HTMLInputElement>,
}