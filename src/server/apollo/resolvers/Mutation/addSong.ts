import mm from "music-metadata"
import { v4 as uuid } from "uuid"
import { FileUpload } from "graphql-upload"
import { UserInputError } from "apollo-server-express"

import {
	Song,
	Genre,
	Artist,
	SQLConfig,
	ImgFormat,
	ImgSizeEnum,
} from "../../../types"

import {
	s3,
	sql,
	isSong,
	createResolver,
	uploadFileFromClient,
	determineChecksResults,
	determineFailedChecks,
} from "../../../helpers"

import {
	INSERT_SONG,
	INSERT_SONG_FEAT,
	INSERT_SONG_GENRE,
	EXISTS_ALBUM_SONG,
	INSERT_SONG_ARTIST,
	INSERT_SONG_REMIXER,
} from "../../../sql"

import { COLUMN_NAMES } from "../../../globals"

type Args = {
	mix: string,
	title: string,
	albumId: string,
	genreIds: string[],
	discNumber: number,
	artistIds: string[],
	trackNumber: number,
	remixerIds: string[],
	featuringIds:string[],
	audio: Promise<FileUpload>,
}

const resolver =
	createResolver()

export const addSong =
	resolver<Song, Args>(
		async ({ args }) => {
			const audio = await uploadFileFromClient(args.audio)

			if (!isSong({ ...args, audio })) {
				throw new UserInputError("Invalid arguments.")
			}

			const checks = [{
				name: "isUniqueAlbumSong",
				check: sql.query({
					sql: EXISTS_ALBUM_SONG,
					parse: res => !sql.resExists(res),
					variables: [{
						key: "albumId",
						value: args.albumId,
					},{
						string: false,
						key: "discNumber",
						value: args.discNumber.toString(),
					},{
						string: false,
						key: "trackNumber",
						value: args.trackNumber.toString(),
					}],
				}),
			},{
				name: "doGenresExist",
				check: sql.exists({
					table: "genres",
					column: "genre_id",
					value: args.genreIds,
				}),
			},{
				name: "doesAlbumExist",
				check: sql.exists({
					table: "albums",
					column: "album_id",
					value: args.albumId,
				}),
			},{
				name: "doArtistsExist",
				check: sql.exists({
					table: "artists",
					column: "artist_id",
					value: args.artistIds,
				}),
			},{
				name: "doRemixersExist",
				check: sql.exists({
					table: "artists",
					column: "artist_id",
					value: args.remixerIds,
				}),
			},{
				name: "doFeaturingExist",
				check: sql.exists({
					table: "artists",
					column: "artist_id",
					value: args.featuringIds,
				}),
			}]

			const checksResults =
				await determineChecksResults(checks)

			if (!checksResults.every(Boolean)) {
				const failedChecks = determineFailedChecks(checks, checksResults)
				throw new UserInputError("Checks failed.", { failedChecks })
			}

			const songId = uuid()
			const metadata = await mm.parseBuffer(audio)
			const duration = Math.floor(metadata.format.duration!)

			const songInsert: SQLConfig<Song> = {
				sql: INSERT_SONG,
				parse: res => sql.parseRow(res),
				variables: [{
					key: "mix",
					value: args.mix,
					parameterized: true,
				},{
					key: "title",
					value: args.title,
					parameterized: true,
				},{
					key: "songId",
					value: songId,
				},{
					key: "albumId",
					value: args.albumId,
				},{
					string: false,
					key: "duration",
					value: duration.toString(),
				},{
					string: false,
					key: "discNumber",
					value: args.discNumber.toString(),
				},{
					string: false,
					key: "trackNumber",
					value: args.trackNumber.toString(),
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.SONG),
				}],
			}

			const genresInsert = args.genreIds.map(
				(genreId, index): SQLConfig<Genre> => ({
					sql: INSERT_SONG_GENRE,
					variables: [{
						key: "songId",
						value: songId,
					},{
						key: "genreId",
						value: genreId,
					},{
						key: "index",
						string: false,
						value: index.toString(),
					}],
				}),
			)

			const artistsInsert = args.artistIds.map(
				(artistId, index): SQLConfig<Artist> => ({
					sql: INSERT_SONG_ARTIST,
					variables: [{
						key: "songId",
						value: songId,
					},{
						key: "artistId",
						value: artistId,
					},{
						key: "index",
						string: false,
						value: index.toString(),
					}],
				}),
			)

			const remixersInsert = args.remixerIds.map(
				(artistId, index): SQLConfig<Artist> => ({
					sql: INSERT_SONG_REMIXER,
					variables: [{
						key: "songId",
						value: songId,
					},{
						key: "artistId",
						value: artistId,
					},{
						key: "index",
						string: false,
						value: index.toString(),
					}],
				}),
			)

			const featuringsInsert = args.featuringIds.map(
				(artistId, index): SQLConfig<Artist> => ({
					sql: INSERT_SONG_FEAT,
					variables: [{
						key: "songId",
						value: songId,
					},{
						key: "artistId",
						value: artistId,
					},{
						key: "index",
						string: false,
						value: index.toString(),
					}],
				}),
			)

			const audioUpload =
				s3.upload({
					data: audio,
					key: s3.catalogObjectKey({
						id: songId,
						format: ImgFormat.MP3,
						size: ImgSizeEnum.FULL,
					}),
				})

			const transaction =
				sql.transaction([
					songInsert,
					...genresInsert,
					...artistsInsert,
					...remixersInsert,
					...featuringsInsert,
				])

			const result =
				await Promise.all([ transaction, audioUpload ])

			return result[0][0] as Song
		},
	)