export type Song = {
	title: string,
	songId: string,
	albumId: string,
	duration: number,
}

export type Play = {
	userId: string,
	playId: string,
	songId: string,
}

export type Album = {
	title: string,
	albumId: string,
}

export type Genre = {
	name: string,
	genreId: string,
}

export type User = {
	name: string,
	userId: string,
	current: string | null,
}

export type UserDoc = {
	dateCreated: number,
}

export type Artist = {
	name: string,
	artistId: string,
}

export type Queue = {
	prev: Song[],
	next: Song[],
	queue: Song[],
	current: Song[],
}

export type Playlist = {
	title: string,
	userId: string,
	playlistId: string,
}