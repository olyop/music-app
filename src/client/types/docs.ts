import {
	UserBase,
	PlayBase,
	SongBase,
	AlbumBase,
	GenreBase,
	ArtistBase,
	PlaylistBase,
} from "@oly_op/music-app-types"

export interface Doc<T = string> {
	__typename: T,
}

export interface UserDoc<T = string> extends Doc<T> {
	plays: Play[],
	inLibrary: boolean,
	dateAdded: number | null,
}

export interface Play extends PlayBase, Doc<"Play"> {
	user: User,
	song: Song,
}

export interface Genre extends GenreBase, Doc<"Genre"> {
	songs: Song[],
	numOfSongs?: number,
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
}

export interface Artist extends ArtistBase, UserDoc<"Artist"> {
	photo: string,
	songs: Song[],
	albums: Album[],
	allPlays: number,
	numOfSongs?: number,
	numOfPlays?: number,
	numOfAlbums?: number,
}

export interface Album extends AlbumBase, UserDoc<"Album"> {
	cover: string,
	songs: Song[],
	genres: Genre[],
	released: string,
	artists: Artist[],
	totalDuration: number,
}

export interface Song extends SongBase, UserDoc<"Song"> {
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
}