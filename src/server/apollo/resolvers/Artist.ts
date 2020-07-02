import { QueryResult } from "pg"

import {
	Song,
	Play,
	Album,
	Artist,
	UserArgs,
	ImgFormat,
	ImgSizeEnum,
} from "../../types"

import {
	SELECT_ARTIST_SONGS,
	SELECT_ARTIST_ALBUMS,
	SELECT_USER_DOC_PLAYS,
} from "../../sql"

import { COLUMN_NAMES } from "../../globals"
import { userDocInLib } from "./common/userDocInLib"
import { userDocDateAdded } from "./common/userDocDateAdded"
import { s3, sql, createResolver, toDataUrl } from "../../helpers"

const resolver = createResolver<Artist>()

export const photo =
	resolver<string, { size: ImgSizeEnum }>(
		({ parent, args }) => (
			s3.getObject({
				parse: toDataUrl,
				key: s3.catalogObjectKey({
					size: args.size,
					id: parent.artistId,
					format: ImgFormat.JPG,
				}),
			})
		),
	)

const artistSongs = <T>(artistId: string, parse: (res: QueryResult) => T) =>
	sql.query({
		sql: SELECT_ARTIST_SONGS,
		parse,
		variables: [{
			key: "artistId",
			value: artistId,
		},{
			string: false,
			key: "columnNames",
			value: sql.join(COLUMN_NAMES.SONG, "songs"),
		}],
	})

export const songs =
	resolver<Song[]>(
		({ parent }) => (
			artistSongs(
				parent.artistId,
				res => sql.parseTable(res),
			)
		),
	)

export const numOfSongs =
	resolver<number>(
		({ parent }) => (
			artistSongs(
				parent.artistId,
				sql.rowCount,
			)
		),
	)

export const artistAlbums = <T>(artistId: string, parse: (res: QueryResult) => T) =>
	sql.query({
		sql: SELECT_ARTIST_ALBUMS,
		parse,
		variables: [{
			key: "artistId",
			value: artistId,
		},{
			string: false,
			key: "columnNames",
			value: sql.join(COLUMN_NAMES.ALBUM, "albums"),
		}],
	})

export const albums =
	resolver<Album[]>(
		({ parent }) => (
			artistAlbums(
				parent.artistId,
				res => sql.parseTable(res),
			)
		),
	)

export const numOfAlbums =
	resolver<number>(
		({ parent }) => (
			artistAlbums(
				parent.artistId,
				sql.rowCount,
			)
		),
	)

export const plays =
	resolver<Play[], UserArgs>(
		({ parent, args }) => (
			sql.query({
				sql: SELECT_USER_DOC_PLAYS,
				parse: res => sql.parseTable(res),
				variables: [{
					key: "userId",
					value: args.userId,
				},{
					key: "artistId",
					value: parent.artistId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.PLAY),
				}],
			})
		),
	)

export const dateAdded =
	resolver<number, UserArgs>(
		({ parent, args }) => (
			userDocDateAdded({
				userId: args.userId,
				docId: parent.artistId,
				columnName: "artist_id",
				userDocTable: "users_artists",
			})
		),
	)

export const inLibrary =
	resolver<boolean, UserArgs>(
		({ parent, args }) => (
			userDocInLib({
				userId: args.userId,
				docId: parent.artistId,
				columnName: "artist_id",
				userDocTable: "users_artists",
			})
		),
	)