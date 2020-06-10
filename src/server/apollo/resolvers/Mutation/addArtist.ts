import { head } from "lodash"
import { v4 as uuid } from "uuid"
import { UserInputError } from "apollo-server-express"

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
} from "../../../helpers"

import { INSERT_ARTIST } from "../../../sql/index.js"
import { ImgSizeEnum, ImgFormat } from "../../../types"
import { IMAGE_SIZES, COLUMN_NAMES } from "../../../globals"

const addArtist = async ({ args }) => {

	console.log(args)

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

	const checksResults = await determineChecksResults(checks)

	if (!checksResults.every(Boolean)) {
		const failedChecks = determineFailedChecks(checks, checksResults)
		throw new UserInputError("Checks failed.", { failedChecks })
	}

	const artistId = uuid()

	const artistInsert = sqlQuery({
		query: INSERT_ARTIST,
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

	const album = head(result)
	
	return album
}

export default addArtist
