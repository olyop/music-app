import {
	Settings,
	ListStyle,
	OrderByDirection,
	SongOrderByField,
	AlbumOrderByField,
	GenreOrderByField,
	ArtistOrderByField,
} from "../../types"

const defaultSettings: Settings = {
	sidebar: false,
	showGenres: false,
	listStyle: ListStyle.GRID,
	songsOrderBy: {
		field: SongOrderByField.TITLE,
		direction: OrderByDirection.ASC,
	},
	albumsOrderBy: {
		direction: OrderByDirection.DESC,
		field: AlbumOrderByField.RELEASED,
	},
	genresOrderBy: {
		field: GenreOrderByField.NAME,
		direction: OrderByDirection.ASC,
	},
	artistsOrderBy: {
		field: ArtistOrderByField.NAME,
		direction: OrderByDirection.ASC,
	},
}

export default defaultSettings