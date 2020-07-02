import { FC } from "react"
import { RouteComponentProps } from "react-router-dom"

import {
	UserBase,
	PlayBase,
	SongBase,
	AlbumBase,
	GenreBase,
	ArtistBase,
	UserDocBase,
	PlaylistBase,
} from "@oly_op/music-app-common"

export interface Doc<T = string> {
	__typename: T,
}

export interface Play extends PlayBase, Doc<"Play"> {
	user: User,
	song: Song,
}

export interface UserDoc<T = string> extends UserDocBase, Doc<T> {
	plays: Play[],
	inLibrary: boolean,
	dateAdded: number | null,
}

export interface Artist extends ArtistBase, UserDoc<"Artist"> {
	photo: string,
	songs: Song[],
	albums: Album[],
	numOfSongs: number,
	numOfAlbums: number,
}

export interface Album extends AlbumBase, UserDoc<"Album"> {
	cover: string,
	songs: Song[],
	artists: Artist[],
	totalDuration: number,
}

export interface Genre extends GenreBase, UserDoc<"Genre"> {
	songs: Song[],
	numOfSongs?: number,
}

export interface Song extends SongBase, UserDoc<"Song"> {
	album: Album,
	genres: Genre[],
	artists: Artist[],
	isCurrent: boolean,
	remixers: Artist[],
	featuring: Artist[],
	dateAddedToPlaylist: number | null,
}

export interface User extends UserBase, Doc<"User"> {
	prev: Song[],
	next: Song[],
	queue: Song[],
	songs: Song[],
	genres: Genre[],
	albums: Album[],
	artists: Artist[],
	current: Song | null,
	playlists: Playlist[],
}

export interface Playlist extends PlaylistBase, UserDoc<"Playlist"> {
	user: User,
	songs: Song[],
}

export enum ListStyleEnum {
	grid = "grid",
	list = "list",
}

export type Disc = {
	songs: Song[],
	number: number,
}

export type Route = {
	id: string,
	path: string,
	icon?: string,
	name?: string,
	ignore?: boolean,
	component: FC<RouteComponentProps>,
}

export type ClassType = {
	ignore: boolean,
	className: string,
}

export type DataUserPlay = {
	prev: Song[],
	next: Song[],
	queue: Song[],
	current: Song,
}

export type ParseSongs = {
	album: Album,
	songs: Song[],
}