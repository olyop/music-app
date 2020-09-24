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
	title: string,
	songId: string,
	duration: number,
	discNumber: number,
	trackNumber: number,
}

export interface PlaylistBase {
	name: string,
	playlistId: string,
	dateCreated: number,
}