import {
	OrderByDirection,
	SongOrderByField,
	AlbumOrderByField,
	GenreOrderByField,
	ArtistOrderByField,
} from "./enums"

export interface DocOrderBy<F> {
	field: F,
	direction: OrderByDirection,
}

export type SongOrderBy = DocOrderBy<SongOrderByField>
export type AlbumOrderBy = DocOrderBy<AlbumOrderByField>
export type GenreOrderBy = DocOrderBy<GenreOrderByField>
export type ArtistOrderBy = DocOrderBy<ArtistOrderByField>