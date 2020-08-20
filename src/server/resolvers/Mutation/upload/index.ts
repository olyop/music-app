/* eslint-disable no-await-in-loop, no-restricted-syntax */
// import { v4 as uuid } from "uuid"
import { UserInputError } from "apollo-server-express"

import {
	songChecks,
	genreChecks,
	albumChecks,
	artistChecks,
} from "./checks"

// import {
// 	insertSong,
// 	insertAlbum,
// 	insertGenre,
// 	insertArtist,
// } from "./inserts"

import {
	createResolver,
	determineFailedChecks,
	determineChecksResults,
} from "../../../helpers"

import recieve from "./recieve"
import { Input } from "./types"
import { pg } from "../../../services"
import { isSong, isAlbum, isGenre, isArtist } from "./validators"

export const upload =
	createResolver()<string, Input>(
		async ({ args }) => {
			const { songs, genres, albums, artists } = await recieve(args)
			const areSongsValid = songs.map(isSong).every(Boolean)
			const areAlbumsValid = albums.map(isAlbum).every(Boolean)
			const areGenresValid = genres.map(isGenre).every(Boolean)
			const areArtistsValid = artists.map(isArtist).every(Boolean)

			if (!areSongsValid || !areGenresValid || !areAlbumsValid || !areArtistsValid) {
				throw new UserInputError("Invalid input.")
			}

			const client = await pg.connect()

			try {
				await client.query("BEGIN")

				for (const genre of genres) {
					const checks = genreChecks(client)(genre)
					const results = await determineChecksResults(checks)
					if (!results.every(Boolean)) {
						throw new UserInputError(
							"Checks failed.",
							determineFailedChecks(checks, results),
						)
					}
				}

				for (const artist of artists) {
					const checks = artistChecks(client)(artist)
					const results = await determineChecksResults(checks)
					if (!results.every(Boolean)) {
						throw new UserInputError(
							"Checks failed.",
							determineFailedChecks(checks, results),
						)
					}
				}

				for ()

				await client.query("COMMIT")
			} catch (error) {
				await client.query("ROLLBACK")
				throw error
			} finally {
				client.release()
			}

			return Promise.resolve("done")
		},
	)