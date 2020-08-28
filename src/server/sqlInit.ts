import {
	ADMIN_SET_TIME_ZONE,
	TABLE_ARTISTS,
	TABLE_GENRES,
	TABLE_ALBUMS,
	TABLE_ALBUMS_ARTISTS,
	TABLE_SONGS,
	TABLE_SONGS_GENRES,
	TABLE_SONGS_ARTISTS,
	TABLE_SONGS_REMIXERS,
	TABLE_SONGS_FEATURINGS,
	TABLE_USERS,
	TABLE_USERS_NEXTS,
	TABLE_USERS_PREVS,
	TABLE_USERS_SONGS,
	TABLE_USERS_ALBUMS,
	TABLE_USERS_QUEUES,
	TABLE_USERS_ARTISTS,
	TABLE_PLAYLISTS,
	TABLE_PLAYLISTS_SONGS,
	TABLE_USERS_PLAYLISTS,
	TABLE_PLAYS,
} from "./sql"

const SQL_INIT = [
	ADMIN_SET_TIME_ZONE,
	TABLE_ARTISTS,
	TABLE_GENRES,
	TABLE_ALBUMS,
	TABLE_ALBUMS_ARTISTS,
	TABLE_SONGS,
	TABLE_SONGS_GENRES,
	TABLE_SONGS_ARTISTS,
	TABLE_SONGS_REMIXERS,
	TABLE_SONGS_FEATURINGS,
	TABLE_USERS,
	TABLE_USERS_NEXTS,
	TABLE_USERS_PREVS,
	TABLE_USERS_SONGS,
	TABLE_USERS_ALBUMS,
	TABLE_USERS_QUEUES,
	TABLE_USERS_ARTISTS,
	TABLE_PLAYLISTS,
	TABLE_PLAYLISTS_SONGS,
	TABLE_USERS_PLAYLISTS,
	TABLE_PLAYS,
]

export default SQL_INIT