import { v4 as uuid } from "uuid"
import { FileUpload } from "graphql-upload"
import { UserInputError } from "apollo-server-express"

import {
	Artist,
	ImgFormat,
	ImgSizeEnum,
} from "../../../types"

import {
	resize,
	sqlJoin,
	s3Upload,
	sqlQuery,
	isArtist,
	sqlUnique,
	sqlParseRow,
	s3CatalogObjectKey,
	uploadFileFromClient,
	determineFailedChecks,
	determineChecksResults,
	resolver,
} from "../../../helpers"

import { INSERT_ARTIST } from "../../../sql/index.js"
import { IMAGE_SIZES, COLUMN_NAMES } from "../../../globals"

type TArgs = {
	name: string,
	photo: Promise<FileUpload>,
}

export const addArtist =
	resolver<Artist, TArgs>(
		async ({ args }) => {
			const photo = await uploadFileFromClient(args.photo)

			if (!isArtist({ ...args, photo })) {
				throw new UserInputError("Invalid arguments.")
			}

			const checks = [{
				name: "isArtistTaken",
				check: sqlUnique({
					column: "name",
					table: "artists",
					value: args.name,
				}),
			}]

			const checksResults =
				await determineChecksResults(checks)

			if (!checksResults.every(Boolean)) {
				const failedChecks = determineFailedChecks(checks, checksResults)
				throw new UserInputError("Checks failed.", { failedChecks })
			}

			const artistId = uuid()

			const artistInsert =
				sqlQuery<Artist>({
					sql: INSERT_ARTIST,
					parse: sqlParseRow,
					variables: [{
						key: "artistId",
						value: artistId,
					},{
						key: "name",
						value: args.name,
						parameterized: true,
					},{
						string: false,
						key: "columnNames",
						value: sqlJoin(COLUMN_NAMES.ARTIST),
					}],
				})

			const photoUploads = [{
				key: s3CatalogObjectKey({
					id: artistId,
					format: ImgFormat.JPG,
					size: ImgSizeEnum.MINI,
				}),
				data: await resize({
					image: photo,
					dim: IMAGE_SIZES.ARTIST.MINI,
				}),
			},{
				key: s3CatalogObjectKey({
					id: artistId,
					format: ImgFormat.JPG,
					size: ImgSizeEnum.HALF,
				}),
				data: await resize({
					image: photo,
					dim: IMAGE_SIZES.ARTIST.HALF,
				}),
			},{
				key: s3CatalogObjectKey({
					id: artistId,
					format: ImgFormat.JPG,
					size: ImgSizeEnum.FULL,
				}),
				data: await resize({
					image: photo,
					dim: IMAGE_SIZES.ARTIST.FULL,
				}),
			}]

			const result = await Promise.all([
				artistInsert,
				...photoUploads.map(s3Upload),
			])

			return result[0]
		},
	)