import {
	join,
	parseRow,
	Variable,
	getResExists,
	query as pgQuery,
	exists as pgExists,
} from "@oly_op/pg-helpers"

import { Pool } from "pg"
import { camelCase } from "lodash"
import { UserInputError } from "apollo-server-express"

import {
	Song,
	Artist,
	Playlist,
} from "../../types"

import {
	SELECT_SONG,
	SELECT_ARTIST,
	EXISTS_USER_DOC,
	INSERT_USER_DOC,
	SELECT_PLAYLIST,
	UPDATE_USER_DOC_IN_LIB,
} from "../../sql"

import { COLUMN_NAMES } from "../../globals"
import { createResolver } from "../../helpers"

const userDoc =
	(pool: Pool) => async <T>({
		add,
		docId,
		userId,
		docName,
		tableName,
		columnName,
		columnNames,
		returnQuery,
		userTableName,
	}: UserDocInput) => {
		const client = await pool.connect()
		const query = pgQuery(client)
		const exists = pgExists(client)

		const docExists =
			await exists({
				value: docId,
				table: tableName,
				column: columnName,
			})

		if (!docExists) {
			throw new UserInputError(`${docName} does not exist.`)
		}

		let returnResult: T

		try {
			await query("BEGIN")

			const variables: Variable[] = [{
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
					parse: getResExists,
					sql: EXISTS_USER_DOC,
				})

			if (doesUserDocExist) {
				await query({
					sql: UPDATE_USER_DOC_IN_LIB,
					parse: parseRow(),
					variables,
				})
			} else {
				await query({
					sql: INSERT_USER_DOC,
					variables: [...variables, {
						value: add,
						string: false,
						key: "inLibrary",
					}],
				})
			}

			returnResult =
				await query({
					sql: returnQuery,
					parse: parseRow<T>(),
					variables: [{
						string: false,
						key: "columnNames",
						value: join(columnNames),
					},{
						value: docId,
						key: camelCase(columnName),
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
	(add, docId, userId) => ({
		add,
		docId,
		userId,
		docName: "Song",
		tableName: "songs",
		columnName: "song_id",
		returnQuery: SELECT_SONG,
		userTableName: "users_songs",
		columnNames: COLUMN_NAMES.SONG,
	})

const artistConfig: AddRemoveFunc =
	(add, docId, userId) => ({
		add,
		docId,
		userId,
		docName: "Artist",
		tableName: "artists",
		columnName: "artist_id",
		returnQuery: SELECT_ARTIST,
		userTableName: "users_artists",
		columnNames: COLUMN_NAMES.ARTIST,
	})

const playlistConfig: AddRemoveFunc =
	(add, docId, userId) => ({
		add,
		docId,
		userId,
		docName: "Playlist",
		tableName: "playlists",
		columnName: "playlist_id",
		returnQuery: SELECT_PLAYLIST,
		userTableName: "users_playlists",
		columnNames: COLUMN_NAMES.PLAYLIST,
	})

const resolver =
	createResolver()

export const rmUserSong =
	resolver<Song, { songId: string }>(
		({ args, context }) => (
			userDoc(context.pg)(songConfig(
				false,
				args.songId,
				context.authorization!.userId,
			))
		),
	)

export const addUserSong =
	resolver<Song, { songId: string }>(
		({ args, context }) => (
			userDoc(context.pg)(songConfig(
				true,
				args.songId,
				context.authorization!.userId,
			))
		),
	)

export const rmUserArtist =
	resolver<Artist, { artistId: string }>(
		({ args, context }) => (
			userDoc(context.pg)(artistConfig(
				false,
				args.artistId,
				context.authorization!.userId,
			))
		),
	)

export const addUserArtist =
	resolver<Artist, { artistId: string }>(
		({ args, context }) => (
			userDoc(context.pg)(artistConfig(
				true,
				args.artistId,
				context.authorization!.userId,
			))
		),
	)

export const rmUserPlaylist =
	resolver<Playlist, { playlistId: string }>(
		({ args, context }) => (
			userDoc(context.pg)(playlistConfig(
				false,
				args.playlistId,
				context.authorization!.userId,
			))
		),
	)

export const addUserPlaylist =
	resolver<Playlist, { playlistId: string }>(
		({ args, context }) => (
			userDoc(context.pg)(playlistConfig(
				true,
				args.playlistId,
				context.authorization!.userId,
			))
		),
	)

export interface UserDocInput {
	add: boolean,
	docId: string,
	userId: string,
	docName: string,
	tableName: string,
	columnName: string,
	returnQuery: string,
	columnNames: string[],
	userTableName: string,
}

type AddRemoveFunc =
	(add: boolean, docId: string, userId: string) => UserDocInput