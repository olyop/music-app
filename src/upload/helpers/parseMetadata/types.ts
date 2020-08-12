import { Album, Song } from "../../types"

export type AlbumParsed = Omit<Album, "albumId" | "songs">

export interface SongParsed extends Omit<Song, "songId"> {
	album: AlbumParsed,
}