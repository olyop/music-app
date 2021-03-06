export interface UserBase {
	name: string,
	userId: string,
	dateJoined: number,
}

export interface UserDocBase {
	dateAdded: number,
}

export interface PlayBase {
	playId: string,
	dateCreated: number,
}

export interface ArtistBase {
	name: string,
	artistId: string,
}

export interface AlbumBase {
	title: string,
	albumId: string,
}

export interface GenreBase {
	name: string,
	genreId: string,
}

export interface SongBase {
	mix: string,
	bpm: string,
	title: string,
	songId: string,
	duration: number,
	discNumber: number,
	trackNumber: number,
}

export interface PlaylistBase {
	title: string,
	playlistId: string,
	dateCreated: number,
}

export interface KeyBase {
	flat: string,
	keyId: string,
	sharp: string,
	camelot: string,
}