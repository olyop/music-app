import { v4 as uuid } from "uuid"
import { FileUpload } from "graphql-upload"
import { UserInputError } from "apollo-server-express"

import {
	Check,
	Album,
	Artist,
	S3Upload,
	SQLConfig,
	ImgFormat,
	ImgSizeEnum,
} from "../../../types"

import {
	s3,
	sql,
	resize,
	isAlbum,
	createResolver,
	determineReleased,
	uploadFileFromClient,
	determineFailedChecks,
	determineChecksResults,
} from "../../../helpers"

import { IMAGE_SIZES, COLUMN_NAMES } from "../../../globals"
import { INSERT_ALBUM, INSERT_ALBUM_ARTIST } from "../../../sql"

interface Input extends Omit<Album, "released"> {
	artists: string[],
	released: string,
	cover: Promise<FileUpload>,
}

interface Args {
	album: Input,
}

const resolver =
	createResolver()

export const addAlbum =
	resolver<Album, Args>(
		async ({ args }) => {
			const { album } = args
			const cover = await uploadFileFromClient(album.cover)

			if (!isAlbum({ ...album, cover })) {
				throw new UserInputError("Invalid arguments.")
			}

			const checks: Check[] = [{
				name: "isAlbumUnique",
				check: sql.unique({
					table: "albums",
					column: "title",
					value: album.title,
				}),
			},{
				name: "doArtistsExist",
				check: sql.exists({
					table: "artists",
					column: "artist_id",
					value: album.artists,
				}),
			}]

			const checksResults =
				await determineChecksResults(checks)

			if (!checksResults.every(Boolean)) {
				const failedChecks = determineFailedChecks(checks, checksResults)
				throw new UserInputError("Checks failed.", { failedChecks })
			}

			const albumId = uuid()

			const albumInsert: SQLConfig<Album> = {
				sql: INSERT_ALBUM,
				parse: sql.parseRow(),
				variables: [{
					key: "albumId",
					value: albumId,
				},{
					key: "title",
					value: album.title,
					parameterized: true,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.ALBUM),
				},{
					string: false,
					key: "released",
					value: determineReleased(album.released).toString(),
				}],
			}

			const artistInsert = (artistId: string, index: number): SQLConfig<Artist> => ({
				sql: INSERT_ALBUM_ARTIST,
				variables: [{
					key: "albumId",
					value: albumId,
				},{
					key: "artistId",
					value: artistId,
				},{
					key: "index",
					string: false,
					value: index.toString(),
				}],
			})

			const transaction =
				sql.transaction([
					albumInsert,
					...album.artists.map(artistInsert),
				])

			const coverUploads: S3Upload[] = [{
				key: s3.catalogObjectKey({
					id: albumId,
					format: ImgFormat.JPG,
					size: ImgSizeEnum.HALF,
				}),
				data: await resize({
					image: cover,
					dim: IMAGE_SIZES.ALBUM.HALF,
				}),
			},{
				key: s3.catalogObjectKey({
					id: albumId,
					format: ImgFormat.JPG,
					size: ImgSizeEnum.FULL,
				}),
				data: await resize({
					image: cover,
					dim: IMAGE_SIZES.ALBUM.FULL,
				}),
			}]

			const result = await transaction
			await Promise.all(coverUploads.map(s3.upload))

			return result[0] as Album
		},
	)