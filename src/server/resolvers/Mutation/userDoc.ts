import { camelCase } from "lodash"

import {
	SELECT_SONG,
	SELECT_ARTIST,
	EXISTS_USER_DOC,
	INSERT_USER_DOC,
	UPDATE_USER_DOC_IN_LIB,
} from "../../sql"

import { pg } from "../../services"
import { COLUMN_NAMES } from "../../globals"
import { sql, createResolver } from "../../helpers"
import { Song, Artist, UserArgs, SqlVariable } from "../../types"

interface AddRemove {
	docId: string,
	userId: string,
	columnName: string,
	returnQuery: string,
	columnNames: string[],
	userTableName: string,
}

interface SongArgs extends UserArgs {
	songId: string,
}

interface ArtistArgs extends UserArgs {
	artistId: string,
}

type AddRemoveFunc =
	(docId: string, userId: string) => AddRemove

const addUserDoc = async <T>({
	docId,
	userId,
	columnName,
	columnNames,
	returnQuery,
	userTableName,
}: AddRemove) => {
	const client = await pg.connect()
	const query = sql.baseQuery(client)

	let returnResult: T

	try {
		await query("BEGIN")

		const variables: SqlVariable[] = [{
			key: "docId",
			value: docId,
		},{
			key: "userId",
			value: userId,
		},{
			string: false,
			key: "columnName",
			value: columnName,
		},{
			string: false,
			key: "tableName",
			value: userTableName,
		}]

		const doesUserDocExist =
			await query({
				sql: EXISTS_USER_DOC,
				parse: sql.resExists,
				variables,
			})

		if (doesUserDocExist) {
			await query({
				sql: UPDATE_USER_DOC_IN_LIB,
				parse: parseSqlRow(),
				variables,
			})
		} else {
			await query({
				sql: INSERT_USER_DOC,
				variables: [...variables, {
					value: true,
					string: false,
					key: "inLibrary",
				}],
			})
		}

		returnResult =
			await query<T>({
				sql: returnQuery,
				parse: parseSqlRow(),
				variables: [{
					value: docId,
					key: camelCase(columnName),
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(columnNames),
				}],
			})

		await query("COMMIT")
	} catch (error) {
		await query("ROLLBACK")
		throw error
	} finally {
		client.release()
	}

	return returnResult
}

const rmUserDoc = async <T>({
	docId,
	userId,
	columnName,
	columnNames,
	returnQuery,
	userTableName,
}: AddRemove) => {
	const client = await pg.connect()
	const query = sql.baseQuery(client)

	let returnResult: T

	try {
		await query("BEGIN")
		const variables: SqlVariable[] = [{
			key: "docId",
			value: docId,
		},{
			key: "userId",
			value: userId,
		},{
			string: false,
			key: "columnName",
			value: columnName,
		},{
			string: false,
			key: "tableName",
			value: userTableName,
		}]

		const doesUserDocExist =
			await query({
				sql: EXISTS_USER_DOC,
				parse: sql.resExists,
				variables,
			})

		if (doesUserDocExist) {
			await query({
				sql: UPDATE_USER_DOC_IN_LIB,
				parse: parseSqlRow(),
				variables,
			})
		} else {
			await query({
				sql: INSERT_USER_DOC,
				variables: [...variables, {
					value: false,
					string: false,
					key: "inLibrary",
				}],
			})
		}

		returnResult =
			await query<T>({
				sql: returnQuery,
				parse: parseSqlRow(),
				variables: [{
					value: docId,
					key: camelCase(columnName),
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(columnNames),
				}],
			})

		await query("COMMIT")
	} catch (error) {
		await query("ROLLBACK")
		throw error
	} finally {
		client.release()
	}

	return returnResult
}

const songConfig: AddRemoveFunc =
	(docId, userId) => ({
		docId,
		userId,
		columnName: "song_id",
		returnQuery: SELECT_SONG,
		userTableName: "users_songs",
		columnNames: COLUMN_NAMES.SONG,
	})

const artistConfig: AddRemoveFunc =
	(docId, userId) => ({
		docId,
		userId,
		columnName: "artist_id",
		returnQuery: SELECT_ARTIST,
		userTableName: "users_artists",
		columnNames: COLUMN_NAMES.ARTIST,
	})

const resolver =
	createResolver()

export const rmUserSong =
	resolver<Song, SongArgs>(
		({ args }) => rmUserDoc(songConfig(args.songId, args.userId)),
	)

export const addUserSong =
	resolver<Song, SongArgs>(
		({ args }) => addUserDoc(songConfig(args.songId, args.userId)),
	)

export const rmUserArtist =
	resolver<Artist, ArtistArgs>(
		({ args }) => rmUserDoc(artistConfig(args.artistId, args.userId)),
	)

export const addUserArtist =
	resolver<Artist, ArtistArgs>(
		({ args }) => addUserDoc(artistConfig(args.artistId, args.userId)),
	)