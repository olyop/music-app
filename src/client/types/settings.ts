import {
	ListStyle,
	OrderByDirection,
	SongsOrderByField,
	AlbumsOrderByField,
	ArtistsOrderByField,
	UserSongsOrderByField,
	UserAlbumsOrderByField,
	UserArtistsOrderByField,
} from "./enums"

export interface OrderBySettings {
	songs: SongsOrderBy,
	albums: AlbumsOrderBy,
	artists: ArtistsOrderBy,
	userSongs: UserSongsOrderBy,
	userAlbums: UserAlbumsOrderBy,
	userArtists: UserArtistsOrderBy,
}

export interface Settings {
	showGenres: boolean,
	listStyle: ListStyle,
	orderBy: OrderBySettings,
}

export interface DocOrderBy<F = string> {
	field: F,
	direction: OrderByDirection,
}

export type SongsOrderBy = DocOrderBy<SongsOrderByField>
export type AlbumsOrderBy = DocOrderBy<AlbumsOrderByField>
export type ArtistsOrderBy = DocOrderBy<ArtistsOrderByField>
export type UserSongsOrderBy = DocOrderBy<UserSongsOrderByField>
export type UserAlbumsOrderBy = DocOrderBy<UserAlbumsOrderByField>
export type UserArtistsOrderBy = DocOrderBy<UserArtistsOrderByField>

export interface UpdateOrderByPayload {
	key: keyof DocOrderBy,
	val: DocOrderBy[keyof DocOrderBy],
	settingsKey: keyof OrderBySettings,
}