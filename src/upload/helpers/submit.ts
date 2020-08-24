import type { ApolloClient } from "@apollo/client"

import ADD from "../graphql/add.gql"
import { Song, Genre, Album, Artist } from "../types"

type Client = ApolloClient<unknown>

type SongUpload = Omit<Song, "songId" | "duration">

type GenreUpload = Omit<Genre, "genreId">

interface AlbumUpload extends Omit<Album, "albumId" | "released" | "songs"> {
	cover: Blob,
	released: string,
	songs: SongUpload[],
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

const songToUpload =
	({ songId, duration, ...song }: Song): SongUpload => song

const albumToUpload =
	({ albumId, songs, cover, released, ...album }: Album): AlbumUpload => ({
		...album,
		cover: cover!,
		songs: songs.map(songToUpload),
		released: released.toISOString().slice(0, 10),
	})

interface SubmitVariables {
	genres: GenreUpload[],
	albums: AlbumUpload[],
	artists: ArtistUpload[],
}

export const submit =
	(client: Client) =>
		async (artists: Artist[], genres: Genre[], albums: Album[]) =>
			client.mutate<string, SubmitVariables>({
				mutation: ADD,
				variables: {
					genres: genres.map(genreToUpload),
					albums: albums.map(albumToUpload),
					artists: artists.map(artistToUpload),
				},
			})