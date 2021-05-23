import {
	KeyBase,
	UserBase,
	PlayBase,
	SongBase,
	AlbumBase,
	GenreBase,
	ArtistBase,
	PlaylistBase,
} from "@oly_op/music-app-common/types"

import { StoreObject } from "@apollo/client"

export type Doc<T = string> = StoreObject<T>

export interface LibraryDoc<T = string> extends Doc<T> {
	userPlays: Play[],
	playsTotal: number | null,
	userPlaysTotal: number | null,
}

export interface Key extends KeyBase, Doc<"Key"> {}

export interface UserDoc<T = string> extends LibraryDoc<T> {
	inLibrary: boolean,
	dateAdded: number | null,
}

export interface Artist extends ArtistBase, UserDoc<"Artist"> {
	songs: Song[],
	albums: Album[],
	songsTotal: number,
	albumsTotal: number,
	topTenSongs: Song[],
}

export interface Album extends AlbumBase, LibraryDoc<"Album"> {
	songs: Song[],
	genres: Genre[],
	duration: number,
	released: string,
	artists: Artist[],
	songsTotal: number,
}

export interface Genre extends GenreBase, LibraryDoc<"Genre"> {
	songs: Song[],
	songsTotal: number | null,
	albumsTotal: number | null,
}

export interface Song extends SongBase, UserDoc<"Song"> {
	key: Key,
	size: number,
	album: Album,
	genres: Genre[],
	artists: Artist[],
	remixers: Artist[],
	featuring: Artist[],
	dateAddedToPlaylist: number | null,
}

export interface Playlist extends PlaylistBase, UserDoc<"Playlist"> {
	user: User,
	songs: Song[],
	songsTotal: number | null,
}

export interface User extends UserBase, Doc<"User"> {
	prev: Song[],
	next: Song[],
	later: Song[],
	songs: Song[],
	genres: Genre[],
	albums: Album[],
	artists: Artist[],
	current: Song | null,
	playlists: Playlist[],
	songsTotal: number | null,
	artistsTotal: number | null,
}

export interface Play extends PlayBase, Doc<"Play"> {
	user: User,
	song: Song,
}

export type InLibraryDoc = Song | Artist | Playlist