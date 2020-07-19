import { FC } from "react"
import { RouteComponentProps } from "react-router-dom"

import {
	SongOrderBy,
	AlbumOrderBy,
	ArtistOrderBy,
	UserSongOrderBy,
	UserAlbumOrderBy,
	UserArtistOrderBy,
} from "./orderBy"

import { ListStyle } from "./enums"
import { Song, Album } from "./docs"

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

export interface UserVar {
	userId: string,
}

export interface Settings {
	sidebar: boolean,
	showGenres: boolean,
	listStyle: ListStyle,
	songsOrderBy: SongOrderBy,
	albumsOrderBy: AlbumOrderBy,
	artistsOrderBy: ArtistOrderBy,
	userSongsOrderBy: UserSongOrderBy,
	userAlbumsOrderBy: UserAlbumOrderBy,
	userArtistsOrderBy: UserArtistOrderBy,
}