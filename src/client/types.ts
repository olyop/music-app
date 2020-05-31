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

export type Doc = Artist | Album

export type BemInputType = string | null