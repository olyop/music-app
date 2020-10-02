import { UserInputError } from "apollo-server-express"

import {
	songChecks,
	genreChecks,
	albumChecks,
	artistChecks,
} from "./checks"

import {
	insertSong,
	insertAlbum,
	insertGenre,
	insertArtist,
	insertSongGenre,
	insertSongArtist,
	insertAlbumArtist,
	insertSongRemixer,
	insertSongFeaturer,
} from "./inserts"

import {
	uploadSong,
	uploadAlbumCovers,
	uploadArtistPhotos,
} from "./s3"

import {
	getSongDuration,
	determineFailedChecks,
	determineChecksResults,
} from "./helpers"

import recieve from "./recieve"
import isValid from "./isValid"
import { Input } from "./types"
import { pg } from "../../../services"
import { sql, createResolver } from "../../../helpers"
import { populateSong, populateAlbum } from "./populate"

export const add =
	createResolver()<string, Input>(
		async ({ args }) => {
			const upload = await recieve(args)

			if (isValid(upload)) throw new UserInputError("Invalid input.")

			const { genres, albums, artists } = upload

			const client = await pg.connect()
			const query = sql.baseQuery(client)

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
					} else {
						await query(insertGenre(genre))
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
					} else {
						const { artistId } = await query(insertArtist(artist))
						await uploadArtistPhotos(artistId, artist.photo)
					}
				}

				for (const album of albums) {
					const albumPopulated = await populateAlbum(client)(album)
					const checks = albumChecks(client)(albumPopulated)
					const results = await determineChecksResults(checks)
					if (!results.every(Boolean)) {
						throw new UserInputError(
							"Checks failed.",
							determineFailedChecks(checks, results),
						)
					} else {
						const { albumId } = await query(insertAlbum(albumPopulated))
						const artistsConfig = albumPopulated.artists.map(insertAlbumArtist(albumId))
						await Promise.all(artistsConfig.map(query))
						for (const song of album.songs) {
							const songPopulated = await populateSong(client)(song)
							const checkss = songChecks(client)(songPopulated, albumId)
							const resultss = await determineChecksResults(checkss)
							if (!results.every(Boolean)) {
								throw new UserInputError(
									"Checks failed.",
									determineFailedChecks(checks, resultss),
								)
							} else {
								const duration = await getSongDuration(song)
								const { songId } = await query(insertSong(songPopulated, albumId, duration))
								const genresConfig = songPopulated.genres.map(insertSongGenre(songId))
								const artistssConfig = songPopulated.artists.map(insertSongArtist(songId))
								const remixersConfig = songPopulated.remixers.map(insertSongRemixer(songId))
								const featuringConfig = songPopulated.featuring.map(insertSongFeaturer(songId))
								await Promise.all(genresConfig.map(query))
								await Promise.all(artistssConfig.map(query))
								await Promise.all(remixersConfig.map(query))
								await Promise.all(featuringConfig.map(query))
								await uploadSong(songId, songPopulated.audio)
							}
						}
						await uploadAlbumCovers(albumId, albumPopulated.cover)
					}
				}

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