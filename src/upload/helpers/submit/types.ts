import type { ApolloClient } from "@apollo/client"
import { Song, Genre, Album, Artist } from "../../types"

export type Client = ApolloClient<unknown>

export interface SongUpload extends Omit<Song, "songId"> {
	album: string,
}

export type GenreUpload = Omit<Genre, "genreId">

export interface AlbumUpload extends Omit<Album, "albumId" | "songs"> {
	cover: Blob,
}

export interface ArtistUpload extends Omit<Artist, "artistId"> {
	photo: Blob,
}