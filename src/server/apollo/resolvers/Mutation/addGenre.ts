import { v4 as uuid } from "uuid"
import { UserInputError } from "apollo-server-express"

import {
	sql,
	isGenre,
	createResolver,
	determineFailedChecks,
	determineChecksResults,
} from "../../../helpers"

import { Genre } from "../../../types"
import { INSERT_GENRE } from "../../../sql"
import { COLUMN_NAMES } from "../../../globals"

interface Args {
	genre: Genre,
}

const resolver =
	createResolver()

export const addGenre =
	resolver<Genre, Args>(
		async ({ args }) => {
			const { genre } = args

			if (!isGenre(genre)) {
				throw new UserInputError("Invalid arguments.")
			}

			const checks = [{
				name: "isGenreTaken",
				check: sql.unique({
					column: "name",
					table: "genres",
					value: genre.name,
				}),
			}]

			const checksResults = await determineChecksResults(checks)

			if (!checksResults.every(Boolean)) {
				const failedChecks = determineFailedChecks(checks, checksResults)
				throw new UserInputError("Checks failed.", { failedChecks })
			}

			return sql.query<Genre>({
				sql: INSERT_GENRE,
				parse: sql.parseRow(),
				variables: [{
					key: "genreId",
					value: uuid(),
				},{
					key: "name",
					value: genre.name,
					parameterized: true,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.GENRE),
				}],
			})
		},
	)