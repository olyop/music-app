import { ComponentType } from "react"

export enum ListStyleEnum {
	grid,
	list,
}

export type Doc = {
	__typename: string,
}

export interface LibDoc extends Doc {
	inLibrary: boolean,
	isCurrent: boolean,
}

export interface Artist extends LibDoc {
	name: string,
	photo: string,
	songs: Song[],
	albums: Album[],
	artistId: string,
	numOfSongs: number,
	numOfAlbums: number,
}

export interface Album extends LibDoc {
	title: string,
	cover: string,
	songs: Song[],
	albumId: string,
	released: number,
	artists: Artist[],
	totalDuration: number,
}

export interface Song extends LibDoc {
	mix: string,
	album: Album,
	title: string,
	songId: string,
	genres: Genre[],
	duration: number,
	artists: Artist[],
	remixers: Artist[],
	discNumber: number,
	isCurrent: boolean,
	trackNumber: number,
}

export interface Genre extends LibDoc {
	name: string,
	songs: Song[],
	genreId: string,
	numOfSongs: number,
}

export interface User extends Doc {
	name: string,
	email: string,
	current: Song,
	userId: string,
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
	component: ComponentType,
}

export type ClassType = {
	ignore: boolean,
	className: string,
}

export type Match = {
	path: string,
}

export type TDataUserPlay = {
	prev: Song[],
	next: Song[],
	current: Song,
	queue: Song[],
}

export type BemInputType = ClassType | string | null | undefined