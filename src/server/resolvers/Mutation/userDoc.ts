import { Pool } from "pg"
import { camelCase } from "lodash"

import {
	sqlJoin,
	sqlQuery,
	parseSqlRow,
	createResolver,
	getSqlResExists,
} from "../../helpers"

import {
	Song,
	Artist,
	SqlVariable,
	AddRemoveInput,
	AddRemoveSongArgs,
	AddRemoveArtistArgs,
} from "../../types"

import {
	SELECT_SONG,
	SELECT_ARTIST,
	EXISTS_USER_DOC,
	INSERT_USER_DOC,
	UPDATE_USER_DOC_IN_LIB,
} from "../../sql"

import { COLUMN_NAMES } from "../../globals"

const addUserDoc =
	(pool: Pool) => async <T>({
		docId,
		userId,
		columnName,
		columnNames,
		returnQuery,
		userTableName,
	}: AddRemoveInput) => {
		const client = await pool.connect()
		const query = sqlQuery(client)

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
					variables,
					sql: EXISTS_USER_DOC,
					parse: getSqlResExists,
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
				await query({
					sql: returnQuery,
					parse: parseSqlRow<T>(),
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

const rmUserDoc =
	(pool: Pool) => async <T>({
		docId,
		userId,
		columnName,
		columnNames,
		returnQuery,
		userTableName,
	}: AddRemoveInput) => {
		const client = await pool.connect()
		const query = sqlQuery(client)

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
					variables,
					sql: EXISTS_USER_DOC,
					parse: getSqlResExists,
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

type AddRemoveFunc =
	(docId: string, userId: string) => AddRemoveInput

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
	resolver<Song, AddRemoveSongArgs>(
		({ args, context }) => (
			rmUserDoc(context.pg)(songConfig(args.songId, args.userId))
		),
	)

export const addUserSong =
	resolver<Song, AddRemoveSongArgs>(
		({ args, context }) => (
			addUserDoc(context.pg)(songConfig(args.songId, args.userId))
		),
	)

export const rmUserArtist =
	resolver<Artist, AddRemoveArtistArgs>(
		({ args, context }) => (
			rmUserDoc(context.pg)(artistConfig(args.artistId, args.userId))
		),
	)

export const addUserArtist =
	resolver<Artist, AddRemoveArtistArgs>(
		({ args, context }) => (
			addUserDoc(context.pg)(artistConfig(args.artistId, args.userId))
		),
	)