import { FC } from "react"
import { RouteComponentProps } from "react-router-dom"

import {
	UserBase,
	PlayBase,
	SongBase,
	AlbumBase,
	GenreBase,
	ArtistBase,
	PlaylistBase,
} from "@oly_op/music-app-common"

export interface Doc {
	__typename: string,
}

export interface Play extends PlayBase, Doc {
	user: User,
	song: Song,
}

export interface UserDoc extends Doc {
	plays: Play[],
	inLibrary: boolean,
	dateAdded: number | null,
}

export interface Artist extends ArtistBase, UserDoc {
	photo: string,
	songs: Song[],
	albums: Album[],
	numOfSongs?: number,
	numOfPlays?: number,
	numOfAlbums?: number,
}

export interface Album extends AlbumBase, UserDoc {
	cover: string,
	songs: Song[],
	artists: Artist[],
	totalDuration: number,
}

export interface Genre extends GenreBase, UserDoc {
	songs: Song[],
	numOfSongs?: number,
}

export interface Song extends SongBase, UserDoc {
	album: Album,
	genres: Genre[],
	artists: Artist[],
	remixers: Artist[],
	featuring: Artist[],
	dateAddedToPlaylist: number | null,
}

export interface User extends UserBase, Doc {
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

export interface Playlist extends PlaylistBase, UserDoc {
	user: User,
	songs: Song[],
}

export enum ListStyle {
	GRID = "GRID",
	LIST = "LIST",
}

export enum OrderByDirection {
	ASC = "ASC",
	DESC = "DESC",
}

export interface Disc {
	songs: Song[],
	number: number,
}

export interface Route {
	id: string,
	path: string,
	icon?: string,
	name?: string,
	ignore?: boolean,
	component: FC<RouteComponentProps>,
}

export interface ClassType {
	ignore: boolean,
	className: string,
}

export interface DataUserPlay {
	prev: Song[],
	next: Song[],
	queue: Song[],
	current: Song,
}

export interface ParseSongs {
	album: Album,
	songs: Song[],
}

export interface DocOrderBy<F> {
	field: F,
	direction: OrderByDirection,
}

export enum SongOrderByField {
	TITLE = "TITLE",
	DURATION = "DURATION",
}

export enum GenreOrderByField {
	NAME = "NAME",
}

export enum ArtistOrderByField {
	NAME = "NAME",
}

export type SongOrderBy = DocOrderBy<SongOrderByField>
export type GenreOrderBy = DocOrderBy<GenreOrderByField>
export type ArtistOrderBy = DocOrderBy<ArtistOrderByField>

export interface Settings {
	sidebar: boolean,
	showGenres: boolean,
	listStyle: ListStyle,
	songsOrderBy: SongOrderBy,
	genresOrderBy: GenreOrderBy,
	artistsOrderBy: ArtistOrderBy,
}