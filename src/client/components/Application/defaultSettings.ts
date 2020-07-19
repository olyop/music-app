import {
	Settings,
	ListStyle,
	OrderByDirection,
	SongOrderByField,
	AlbumOrderByField,
	ArtistOrderByField,
	UserSongOrderByField,
	UserAlbumOrderByField,
	UserArtistOrderByField,
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
	artistsOrderBy: {
		field: ArtistOrderByField.NAME,
		direction: OrderByDirection.ASC,
	},
	userSongsOrderBy: {
		direction: OrderByDirection.DESC,
		field: UserSongOrderByField.DATE_ADDED,
	},
	userAlbumsOrderBy: {
		direction: OrderByDirection.DESC,
		field: UserAlbumOrderByField.DATE_ADDED,
	},
	userArtistsOrderBy: {
		direction: OrderByDirection.DESC,
		field: UserArtistOrderByField.DATE_ADDED,
	},
}

export default defaultSettings