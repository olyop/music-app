import {
	UserBase,
	PlayBase,
	SongBase,
	AlbumBase,
	GenreBase,
	ArtistBase,
	PlaylistBase,
} from "@oly_op/music-app-types"

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
	released: string,
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