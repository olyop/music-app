import {
	ListStyle,
	OrderByDirection,
	SongsOrderByField,
	GenresOrderByField,
	AlbumsOrderByField,
	ArtistsOrderByField,
	PlaylistOrderByField,
	UserSongsOrderByField,
	UserArtistsOrderByField,
} from "./enums"

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
export type GenresOrderBy = DocOrderBy<GenresOrderByField>
export type AlbumsOrderBy = DocOrderBy<AlbumsOrderByField>
export type ArtistsOrderBy = DocOrderBy<ArtistsOrderByField>
export type PlaylistOrderBy = DocOrderBy<PlaylistOrderByField>
export type UserSongsOrderBy = DocOrderBy<UserSongsOrderByField>
export type UserArtistsOrderBy = DocOrderBy<UserArtistsOrderByField>

export interface OrderBySettings {
	songs: SongsOrderBy,
	genres: GenresOrderBy,
	albums: AlbumsOrderBy,
	artists: ArtistsOrderBy,
	playlists: PlaylistOrderBy,
	userSongs: UserSongsOrderBy,
	userArtists: UserArtistsOrderBy,
}

export interface UpdateOrderByPayload {
	key: keyof DocOrderBy,
	val: DocOrderBy[keyof DocOrderBy],
	settingsKey: keyof OrderBySettings,
}