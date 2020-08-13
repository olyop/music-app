import { Client } from "./types"
import { Genre, Album, Artist } from "../../types"
import { populateSong, populateAlbum } from "./populate"
import { uploadSong, uploadAlbum, uploadGenre, uploadArtist } from "./uploads"
import { genreToUpload, artistToUpload, albumToUpload, albumsToSongUploads } from "./toUpload"

export const submit =
	(client: Client) =>
		async (artists: Artist[], genres: Genre[], albums: Album[]) => {
			try {
				// upload genres
				const uploadGenres = genres.map(genreToUpload)
				await Promise.all(uploadGenres.map(uploadGenre(client)))

				// upload artists
				const uploadArtists = artists.map(artistToUpload)
				await Promise.all(uploadArtists.map(uploadArtist(client)))

				// upload albums
				const uploadAlbums = albums.map(albumToUpload)
				const albumsPopulated = await Promise.all(uploadAlbums.map(populateAlbum(client)))
				await Promise.all(albumsPopulated.map(uploadAlbum(client)))

				// upload songs
				const uploadSongs = albumsToSongUploads(albums)
				const songsPopulated = await Promise.all(uploadSongs.map(populateSong(client)))
				await Promise.all(songsPopulated.map(uploadSong(client)))
			} catch (error) {
				console.error(error)
			}
		}