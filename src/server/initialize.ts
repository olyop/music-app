import { APP } from "@oly_op/music-app-common/globals"

import {
	IS_DEV,
	AWS_S3_CREATE_BUCKET_CONFIG,
} from "./globals"

import {
	SET_TIMEZONE,
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
	USERS_NAME_INDEX,
	SONGS_TITLE_INDEX,
	GENRES_NAME_INDEX,
	ALBUMS_TITLE_INDEX,
	ARTISTS_NAME_INDEX,
	PLAYLISTS_NAME_INDEX,
} from "./sql"

import { s3, pg } from "./services"

const SQL_INIT = [
	SET_TIMEZONE,
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
	USERS_NAME_INDEX,
	SONGS_TITLE_INDEX,
	GENRES_NAME_INDEX,
	ALBUMS_TITLE_INDEX,
	ARTISTS_NAME_INDEX,
	PLAYLISTS_NAME_INDEX,
]

const initializeDatabase = async () => {
	const client = await pg.connect()
	try {
		await client.query("BEGIN")
		for (const query of SQL_INIT) await client.query(query)
		await client.query("COMMIT")
	} catch (error) {
		await client.query("ROLLBACK")
	} finally {
		client.release()
	}
}

const initializeS3 = async () => {
	await s3.headBucket({ Bucket: APP }).promise()
	await s3.createBucket(AWS_S3_CREATE_BUCKET_CONFIG).promise()
}

const initialize = async () => {
	if (!IS_DEV) {
		try {
			await initializeDatabase()
			await initializeS3()
		} catch (err) {
			console.error(err)
		}
	}
}

export default initialize