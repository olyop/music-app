import type { ApolloClient } from "@apollo/client"

import UPLOAD from "../graphql/upload.gql"
import { Song, Genre, Album, Artist } from "../types"

type Client = ApolloClient<unknown>

interface SongUpload extends Omit<Song, "songId" | "duration"> {
	album: string,
}

type GenreUpload = Omit<Genre, "genreId">

interface AlbumUpload extends Omit<Album, "albumId" | "songs"> {
	cover: Blob,
}

interface ArtistUpload extends Omit<Artist, "artistId"> {
	photo: Blob,
}

const genreToUpload =
	({ name }: Genre): GenreUpload => ({
		name,
	})

const artistToUpload =
	({ artistId, photo, ...artist }: Artist): ArtistUpload => ({
		...artist,
		photo: photo!,
	})

const albumToUpload =
	({ albumId, songs, cover, ...album }: Album): AlbumUpload => ({
		...album,
		cover: cover!,
	})

const songToUpload =
	(album: string) => ({ songId, duration, ...song }: Song): SongUpload => ({
		...song,
		album,
	})

const albumsToSongUploads =
	(albums: Album[]) =>
		albums.reduce<SongUpload[]>(
			(songs, album) => [
				...songs,
				...album.songs.map(songToUpload(album.title)),
			],
			[],
		)

export const upload =
	(client: Client) =>
		async (artists: Artist[], genres: Genre[], albums: Album[]) =>
			client.mutate({
				mutation: UPLOAD,
				variables: {
					genres: genres.map(genreToUpload),
					albums: albums.map(albumToUpload),
					songs: albumsToSongUploads(albums),
					artists: artists.map(artistToUpload),
				},
			})