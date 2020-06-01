export enum ListStyleEnum {
	grid,
	list,
}

export interface ApolloDoc {
	__typename: string,
}

export interface Artist extends ApolloDoc {
	name: string,
	photo: string,
	artistId: string,
}

export interface Album extends ApolloDoc {
	title: string,
	cover: string,
	albumId: string,
	released: number,
	artists: Artist[],
}

export interface Song extends ApolloDoc {
	mix: string,
	title: string,
	songId: string,
	duration: number,
	discNumber: number,
	trackNumber: number,
}

export interface User extends ApolloDoc {
	name: string,
	email: string,
	userId: string,
}

export type Disc = {
	songs: Song[],
	number: number,
}

export type Doc = Artist | Album | Song

export type BemInputType = string | null