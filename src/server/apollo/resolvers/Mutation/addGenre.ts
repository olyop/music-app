import { v4 as uuid } from "uuid"
import { UserInputError } from "apollo-server-express"

import {
	sql,
	isGenre,
	createResolver,
	determineFailedChecks,
	determineChecksResults,
} from "../../../helpers"

import { INSERT_GENRE } from "../../../sql"
import { COLUMN_NAMES } from "../../../globals"
import { Genre, GenreArgs } from "../../../types"

const resolver =
	createResolver()

export const addGenre =
	resolver<Genre, GenreArgs>(
		async ({ args }) => {
			if (!isGenre(args)) {
				throw new UserInputError("Invalid arguments.")
			}

			const checks = [{
				name: "isGenreTaken",
				check: sql.unique({
					column: "name",
					table: "genres",
					value: args.name,
				}),
			}]

			const checksResults = await determineChecksResults(checks)

			if (!checksResults.every(Boolean)) {
				const failedChecks = determineFailedChecks(checks, checksResults)
				throw new UserInputError("Checks failed.", { failedChecks })
			}

			return sql.query<Genre>({
				sql: INSERT_GENRE,
				parse: res => sql.parseRow(res),
				variables: [{
					key: "genreId",
					value: uuid(),
				},{
					key: "name",
					value: args.name,
					parameterized: true,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.GENRE),
				}],
			})
		},
	)