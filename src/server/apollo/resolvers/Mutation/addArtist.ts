import { v4 as uuid } from "uuid"
import { FileUpload } from "graphql-upload"
import { UserInputError } from "apollo-server-express"

import {
	Artist,
	ImgFormat,
	ImgSizeEnum,
} from "../../../types"

import {
	s3,
	sql,
	resize,
	isArtist,
	createResolver,
	uploadFileFromClient,
	determineFailedChecks,
	determineChecksResults,
} from "../../../helpers"

import { INSERT_ARTIST } from "../../../sql"
import { IMAGE_SIZES, COLUMN_NAMES } from "../../../globals"

interface Input extends Artist {
	photo: Promise<FileUpload>,
}

interface Args {
	artist: Input,
}

const resolver =
	createResolver()

export const addArtist =
	resolver<Artist, Args>(
		async ({ args }) => {
			const { artist } = args
			const photo = await uploadFileFromClient(artist.photo)

			if (!isArtist({ ...artist, photo })) {
				throw new UserInputError("Invalid arguments.")
			}

			const checks = [{
				name: "isArtistTaken",
				check: sql.unique({
					column: "name",
					table: "artists",
					value: artist.name,
				}),
			}]

			const checksResults = await determineChecksResults(checks)

			if (!checksResults.every(Boolean)) {
				const failedChecks = determineFailedChecks(checks, checksResults)
				throw new UserInputError("Checks failed.", { failedChecks })
			}

			const artistId = uuid()

			const artistInsert =
				sql.query<Artist>({
					sql: INSERT_ARTIST,
					parse: res => sql.parseRow(res),
					variables: [{
						key: "artistId",
						value: artistId,
					},{
						key: "name",
						value: artist.name,
						parameterized: true,
					},{
						string: false,
						key: "columnNames",
						value: sql.join(COLUMN_NAMES.ARTIST),
					}],
				})

			const photoUploads = [{
				key: s3.catalogObjectKey({
					id: artistId,
					format: ImgFormat.JPG,
					size: ImgSizeEnum.MINI,
				}),
				data: await resize({
					image: photo,
					dim: IMAGE_SIZES.ARTIST.MINI,
				}),
			},{
				key: s3.catalogObjectKey({
					id: artistId,
					format: ImgFormat.JPG,
					size: ImgSizeEnum.HALF,
				}),
				data: await resize({
					image: photo,
					dim: IMAGE_SIZES.ARTIST.HALF,
				}),
			},{
				key: s3.catalogObjectKey({
					id: artistId,
					format: ImgFormat.JPG,
					size: ImgSizeEnum.FULL,
				}),
				data: await resize({
					image: photo,
					dim: IMAGE_SIZES.ARTIST.FULL,
				}),
			}]

			const result = await artistInsert
			await Promise.all(photoUploads.map(s3.upload))

			return result
		},
	)