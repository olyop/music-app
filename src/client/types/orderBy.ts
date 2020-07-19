import {
	OrderByDirection,
	SongOrderByField,
	AlbumOrderByField,
	ArtistOrderByField,
	UserSongOrderByField,
	UserAlbumOrderByField,
	UserArtistOrderByField,
} from "./enums"

export interface DocOrderBy<F = unknown> {
	field: F,
	direction: OrderByDirection,
}

export type SongOrderBy = DocOrderBy<SongOrderByField>
export type AlbumOrderBy = DocOrderBy<AlbumOrderByField>
export type ArtistOrderBy = DocOrderBy<ArtistOrderByField>
export type UserSongOrderBy = DocOrderBy<UserSongOrderByField>
export type UserAlbumOrderBy = DocOrderBy<UserAlbumOrderByField>
export type UserArtistOrderBy = DocOrderBy<UserArtistOrderByField>