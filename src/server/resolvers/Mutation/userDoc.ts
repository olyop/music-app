import { camelCase } from "lodash"

import {
	SELECT_SONG,
	SELECT_ARTIST,
	EXISTS_USER_DOC,
	INSERT_USER_DOC,
	UPDATE_USER_DOC_IN_LIB,
} from "../../sql"

import { COLUMN_NAMES } from "../../globals"
import { sql, createResolver } from "../../helpers"
import { Song, Artist, UserArgs, SqlVariable } from "../../types"

interface AddRemoveInput {
	query: string,
	docId: string,
	userId: string,
	columnName: string,
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
	(docId: string, userId: string) => AddRemoveInput

const addUserDoc = async <T>({
	query,
	docId,
	userId,
	columnName,
	columnNames,
	userTableName,
}: AddRemoveInput) => {
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
		await sql.query({
			sql: EXISTS_USER_DOC,
			parse: sql.resExists,
			variables,
		})

	const updateUserDocInLib =
		sql.query({
			sql: UPDATE_USER_DOC_IN_LIB,
			parse: sql.parseRow(),
			variables,
		})

	const insertUserDoc =
		sql.query({
			sql: INSERT_USER_DOC,
			variables,
		})

	const actionQuery =
		doesUserDocExist ? updateUserDocInLib : insertUserDoc

	const returnQuery =
		sql.query<T>({
			sql: query,
			parse: sql.parseRow(),
			variables: [{
				value: docId,
				key: camelCase(columnName),
			},{
				string: false,
				key: "columnNames",
				value: sql.join(columnNames),
			}],
		})

	return (await Promise.all([ returnQuery, actionQuery ]))[0]
}

const rmUserDoc = async <T>({
	query,
	docId,
	userId,
	columnName,
	columnNames,
	userTableName,
}: AddRemoveInput) => {
	await sql.query({
		sql: UPDATE_USER_DOC_IN_LIB,
		variables: [{
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
		}],
	})

	return sql.query<T>({
		sql: query,
		parse: sql.parseRow(),
		variables: [{
			value: docId,
			key: camelCase(columnName),
		},{
			string: false,
			key: "columnNames",
			value: sql.join(columnNames),
		}],
	})
}

const songConfig: AddRemoveFunc =
	(docId, userId) => ({
		docId,
		userId,
		query: SELECT_SONG,
		columnName: "song_id",
		userTableName: "users_songs",
		columnNames: COLUMN_NAMES.SONG,
	})

const artistConfig: AddRemoveFunc =
	(docId, userId) => ({
		docId,
		userId,
		query: SELECT_ARTIST,
		columnName: "artist_id",
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