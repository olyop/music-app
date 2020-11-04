import { IS_DEV } from "./globals"

import {
	TABLE_KEYS,
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
	TABLE_USERS_LATERS,
	TABLE_USERS_ARTISTS,
	TABLE_PLAYLISTS,
	TABLE_PLAYLISTS_SONGS,
	TABLE_USERS_PLAYLISTS,
	TABLE_PLAYS,
} from "./sql"

import { pg } from "./services"

const SQL_INIT = [
	TABLE_KEYS,
	TABLE_ARTISTS,
	TABLE_ALBUMS,
	TABLE_ALBUMS_ARTISTS,
	TABLE_GENRES,
	TABLE_SONGS,
	TABLE_SONGS_GENRES,
	TABLE_SONGS_ARTISTS,
	TABLE_SONGS_REMIXERS,
	TABLE_SONGS_FEATURINGS,
	TABLE_USERS,
	TABLE_USERS_NEXTS,
	TABLE_USERS_PREVS,
	TABLE_USERS_SONGS,
	TABLE_USERS_LATERS,
	TABLE_USERS_ARTISTS,
	TABLE_PLAYLISTS,
	TABLE_PLAYLISTS_SONGS,
	TABLE_USERS_PLAYLISTS,
	TABLE_PLAYS,
]

const initializeDatabase = async () => {
	const client = await pg.connect()
	try {
		await client.query("BEGIN")
		for (const query of SQL_INIT) {
			await client.query(query)
		}
		await client.query("COMMIT")
	} catch (error) {
		await client.query("ROLLBACK")
	} finally {
		client.release()
	}
}
const initialize = async () => {
	if (!IS_DEV) {
		try {
			await initializeDatabase()
		} catch (err) {
			console.error(err)
		}
	}
}

export default initialize