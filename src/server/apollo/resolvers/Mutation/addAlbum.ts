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
	resize,
	sqlJoin,
	isAlbum,
	s3Upload,
	resolver,
	sqlExists,
	sqlUnique,
	sqlParseRow,
	sqlTransaction,
	determineReleased,
	s3CatalogObjectKey,
	uploadFileFromClient,
	determineFailedChecks,
	determineChecksResults,
} from "../../../helpers"

import { IMAGE_SIZES, COLUMN_NAMES } from "../../../globals"
import { INSERT_ALBUM, INSERT_ALBUM_ARTIST } from "../../../sql"

type TVar = {
	title: string,
	released: string,
	artistIds: string[],
	cover: Promise<FileUpload>,
}

export const addAlbum =
	resolver<Album, TVar>(
		async ({ args }) => {
			const cover = await uploadFileFromClient(args.cover)

			if (!isAlbum({ ...args, cover })) {
				throw new UserInputError("Invalid arguments.")
			}

			const checks: Check[] = [{
				name: "isAlbumUnique",
				check: sqlUnique({
					table: "albums",
					column: "title",
					value: args.title,
				}),
			},{
				name: "doArtistsExist",
				check: sqlExists({
					table: "artists",
					column: "artist_id",
					value: args.artistIds,
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
				parse: res => sqlParseRow(res),
				variables: [{
					key: "albumId",
					value: albumId,
				},{
					key: "title",
					value: args.title,
					parameterized: true,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.ALBUM),
				},{
					string: false,
					key: "released",
					value: determineReleased(args.released).toString(),
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
				sqlTransaction([
					albumInsert,
					...args.artistIds.map(artistInsert),
				])

			const coverUploads: S3Upload[] = [{
				key: s3CatalogObjectKey({
					id: albumId,
					format: ImgFormat.JPG,
					size: ImgSizeEnum.HALF,
				}),
				data: await resize({
					image: cover,
					dim: IMAGE_SIZES.ALBUM.HALF,
				}),
			},{
				key: s3CatalogObjectKey({
					id: albumId,
					format: ImgFormat.JPG,
					size: ImgSizeEnum.FULL,
				}),
				data: await resize({
					image: cover,
					dim: IMAGE_SIZES.ALBUM.FULL,
				}),
			}]

			const result = await Promise.all([
				transaction,
				...coverUploads.map(s3Upload),
			])

			return result[0][0]
		},
	)