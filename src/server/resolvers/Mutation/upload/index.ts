/* eslint-disable no-await-in-loop, no-restricted-syntax */
import { parseBuffer } from "music-metadata"
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
	sql,
	createResolver,
	determineFailedChecks,
	determineChecksResults,
} from "../../../helpers"

import recieve from "./recieve"
import { Input } from "./types"
import { pg } from "../../../services"
import { populateSong, populateAlbum } from "./populate"
import { isSong, isAlbum, isGenre, isArtist } from "./validators"
import { uploadSong, uploadAlbumCovers, uploadArtistPhotos } from "./s3"

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
					} else {
						await sql.baseQuery(client)(insertGenre(genre))
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
						const { artistId } = await sql.baseQuery(client)(insertArtist(artist))
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
						const { albumId } = await sql.baseQuery(client)(insertAlbum(albumPopulated))
						const artistsConfig = albumPopulated.artists.map(insertAlbumArtist(albumId))
						await Promise.all(artistsConfig.map(sql.baseQuery(client)))
						await uploadAlbumCovers(albumId, albumPopulated.cover)
					}
				}

				for (const song of songs) {
					const songPopulated = await populateSong(client)(song)
					const checks = songChecks(client)(songPopulated)
					const results = await determineChecksResults(checks)
					if (!results.every(Boolean)) {
						throw new UserInputError(
							"Checks failed.",
							determineFailedChecks(checks, results),
						)
					} else {
						const duration = Math.floor((await parseBuffer(songPopulated.audio)).format.duration || 0)
						const { songId } = await sql.baseQuery(client)(insertSong(songPopulated, duration))
						const genresConfig = songPopulated.genres.map(insertSongGenre(songId))
						const artistsConfig = songPopulated.artists.map(insertSongArtist(songId))
						const remixersConfig = songPopulated.remixers.map(insertSongRemixer(songId))
						const featuringConfig = songPopulated.featuring.map(insertSongFeaturer(songId))
						const query = sql.baseQuery(client)
						await Promise.all(genresConfig.map(query))
						await Promise.all(artistsConfig.map(query))
						await Promise.all(remixersConfig.map(query))
						await Promise.all(featuringConfig.map(query))
						await uploadSong(songId, songPopulated.audio)
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