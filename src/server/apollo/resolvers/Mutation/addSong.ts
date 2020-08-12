import { v4 as uuid } from "uuid"
import { FileUpload } from "graphql-upload"
import musicMetadata from "music-metadata-browser"
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

interface Input extends Omit<Song, "albumId"> {
	album: string,
	genres: string[],
	artists: string[],
	remixers: string[],
	featuring: string[],
	audio: Promise<FileUpload>,
}

interface Args {
	song: Input,
}

const resolver =
	createResolver()

export const addSong =
	resolver<Song, Args>(
		async ({ args }) => {
			const { song } = args
			const audio = await uploadFileFromClient(song.audio)

			if (!isSong({ ...song, audio })) {
				throw new UserInputError("Invalid arguments.")
			}

			const checks = [{
				name: "isUniqueAlbumSong",
				check: sql.query({
					sql: EXISTS_ALBUM_SONG,
					parse: res => !sql.resExists(res),
					variables: [{
						key: "albumId",
						value: song.album,
					},{
						string: false,
						key: "discNumber",
						value: song.discNumber.toString(),
					},{
						string: false,
						key: "trackNumber",
						value: song.trackNumber.toString(),
					}],
				}),
			},{
				name: "doGenresExist",
				check: sql.exists({
					table: "genres",
					column: "genre_id",
					value: song.genres,
				}),
			},{
				name: "doesAlbumExist",
				check: sql.exists({
					table: "albums",
					value: song.album,
					column: "album_id",
				}),
			},{
				name: "doArtistsExist",
				check: sql.exists({
					table: "artists",
					column: "artist_id",
					value: song.artists,
				}),
			},{
				name: "doRemixersExist",
				check: sql.exists({
					table: "artists",
					column: "artist_id",
					value: song.remixers,
				}),
			},{
				name: "doFeaturingExist",
				check: sql.exists({
					table: "artists",
					column: "artist_id",
					value: song.featuring,
				}),
			}]

			const checksResults =
				await determineChecksResults(checks)

			if (!checksResults.every(Boolean)) {
				const failedChecks = determineFailedChecks(checks, checksResults)
				throw new UserInputError("Checks failed.", { failedChecks })
			}

			const songId = uuid()
			const metadata = await musicMetadata.parseBuffer(audio)
			const duration = Math.floor(metadata.format.duration || 0)

			const songInsert: SQLConfig<Song> = {
				sql: INSERT_SONG,
				parse: sql.parseRow(),
				variables: [{
					key: "mix",
					value: song.mix,
					parameterized: true,
				},{
					key: "title",
					value: song.title,
					parameterized: true,
				},{
					key: "songId",
					value: songId,
				},{
					key: "albumId",
					value: song.album,
				},{
					string: false,
					key: "duration",
					value: duration.toString(),
				},{
					string: false,
					key: "discNumber",
					value: song.discNumber.toString(),
				},{
					string: false,
					key: "trackNumber",
					value: song.trackNumber.toString(),
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.SONG),
				}],
			}

			const genresInsert = song.genres.map(
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

			const artistsInsert = song.artists.map(
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

			const remixersInsert = song.remixers.map(
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

			const featuringsInsert = song.featuring.map(
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