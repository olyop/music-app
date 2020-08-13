import { Client, SongUpload, AlbumUpload } from "./types"
import { searchGenre, searchAlbum, searchArtist } from "./search"

export const populateAlbum =
	(client: Client) => async (album: AlbumUpload): Promise<AlbumUpload> => {
		const artists = await Promise.all(album.artists.map(searchArtist(client)))
		return { ...album, artists }
	}

export const populateSong =
	(client: Client) => async (song: SongUpload): Promise<SongUpload> => {
		const album = await searchAlbum(client)(song.album)
		const genres = await Promise.all(song.genres.map(searchGenre(client)))
		const artists = await Promise.all(song.artists.map(searchArtist(client)))
		const remixers = await Promise.all(song.remixers.map(searchArtist(client)))
		const featuring = await Promise.all(song.featuring.map(searchArtist(client)))
		return { ...song, album, genres, artists, remixers, featuring }
	}