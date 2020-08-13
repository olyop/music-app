import { Artist, Album, Genre, Song } from "../../types"
import { ArtistUpload, AlbumUpload, GenreUpload, SongUpload } from "./types"

export const genreToUpload =
	({ name }: Genre): GenreUpload => ({
		name,
	})

export const artistToUpload =
	({ artistId, photo, ...artist }: Artist): ArtistUpload => ({
		...artist,
		photo: photo!,
	})

export const albumToUpload =
	({ albumId, songs, cover, ...album }: Album): AlbumUpload => ({
		...album,
		cover: cover!,
	})

const songToUpload =
	(album: string) => ({ songId, ...song }: Song): SongUpload => ({
		...song,
		album,
	})

export const albumsToSongUploads =
	(albums: Album[]) =>
		albums.reduce<SongUpload[]>(
			(songs, album) => [
				...songs,
				...album.songs.map(songToUpload(album.title)),
			],
			[],
		)