import type { FetchResult } from "@apollo/client"

import ADD_SONG from "../../graphql/addSong.gql"
import ADD_ALBUM from "../../graphql/addAlbum.gql"
import ADD_GENRE from "../../graphql/addGenre.gql"
import ADD_ARTIST from "../../graphql/addArtist.gql"

import { Song, Genre, Album, Artist } from "../../types"
import { Client, SongUpload, GenreUpload, AlbumUpload, ArtistUpload } from "./types"

export const uploadSong =
	(client: Client) => (variables: SongUpload): Promise<FetchResult<Song>> =>
		client.mutate({ mutation: ADD_SONG, variables })

export const uploadAlbum =
	(client: Client) => (variables: AlbumUpload): Promise<FetchResult<Album>> =>
		client.mutate<Album>({ mutation: ADD_ALBUM, variables })

export const uploadGenre =
	(client: Client) => (variables: GenreUpload): Promise<FetchResult<Genre>> =>
		client.mutate<Genre>({ mutation: ADD_GENRE, variables })

export const uploadArtist =
	(client: Client) => (variables: ArtistUpload): Promise<FetchResult<Artist>> =>
		client.mutate<Artist>({ mutation: ADD_ARTIST, variables })