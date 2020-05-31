export enum ListStyleEnum {
	grid,
	list,
}

export type ListStyleType = {
	listStyle: ListStyleEnum,
	setListStyle?: (val: ListStyleEnum) => void,
}

export type Artist = {
	name: string,
	photo: string,
	artistId: string,
}

export type Album = {
	title: string,
	cover: string,
	albumId: string,
	released: number,
	artists: Artist[],
}

export type Song = {
	mix: string,
	title: string,
	songId: string,
	duration: number,
	discNumber: number,
	trackNumber: number,
}

export type Disc = {
	songs: Song[],
	number: number,
}

export type Doc = Artist | Album | Song

export type BemInputType = string | null