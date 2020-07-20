import { SongBase, AlbumBase } from "@oly_op/music-app-common"
import { Song as SongType, Album as AlbumType } from "../../types"

export interface ParseSong {
	album: AlbumType,
	songs: SongType[],
}

export interface Doc {
	id: string,
	val: string | number,
}

export interface Song extends SongBase {
	genres: Doc[],
	artists: Doc[],
	remixers: Doc[],
	featuring: Doc[],
}

export interface Album extends AlbumBase {
	cover: string,
	artists: Doc[],
}