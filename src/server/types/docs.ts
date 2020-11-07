import {
	KeyBase,
	UserBase,
	PlayBase,
	SongBase,
	AlbumBase,
	GenreBase,
	ArtistBase,
	UserDocBase,
	PlaylistBase,
} from "@oly_op/music-app-common/types"

export interface User extends UserBase {
	prev?: string[],
	next?: string[],
	later?: string[],
	current: string | null,
}

export type Key = KeyBase

export type UserDoc = UserDocBase

export interface Play extends PlayBase {
	playId: string,
	userId: string,
	songId: string,
}

export interface Song extends UserDocBase, SongBase {
	keyId: string,
	albumId: string,
}

export interface Playlist extends UserDocBase, PlaylistBase {
	userId: string,
}

export interface Album extends UserDocBase, AlbumBase {
	released: Date,
}

export interface Genre extends UserDocBase, GenreBase {}

export interface Artist extends UserDocBase, ArtistBase {}