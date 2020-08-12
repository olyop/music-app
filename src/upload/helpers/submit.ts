/* eslint-disable no-restricted-syntax */
import type { ApolloClient } from "@apollo/client"

import {
	Song,
	Genre,
	Album,
	Artist,
	SongUpload,
	GenreUpload,
	AlbumUpload,
	ArtistUpload,
} from "../types"

import ADD_SONG from "../graphql/addSong.gql"
import ADD_ALBUM from "../graphql/addAlbum.gql"
import ADD_GENRE from "../graphql/addGenre.gql"
import ADD_ARTIST from "../graphql/addArtist.gql"
import ALBUM_SEARCH from "../graphql/albumSearch.gql"
import GENRE_SEARCH from "../graphql/genreSearch.gql"
import ARTIST_SEARCH from "../graphql/artistSearch.gql"

import { getSearchResults } from "./getSearchResults"

type Client = ApolloClient<unknown>

interface AlbumRes {
	albumSearch: Album[],
}

interface GenreRes {
	genreSearch: Genre[],
}

interface ArtistRes {
	artistSearch: Artist[],
}

const genreUploads = (client: Client, genres: Genre[]) =>
	genres.map(({ name }) => client.mutate<Genre, GenreUpload>({
		mutation: ADD_GENRE,
		variables: { name },
	}))

const artistUploads = (client: Client, artists: Artist[]) =>
	artists.map(({ name, photo }) => client.mutate<Artist, ArtistUpload>({
		mutation: ADD_ARTIST,
		variables: { name, photo: photo! },
	}))

const searchAlbum = (client: Client) => async (album: string) => {
	const search = getSearchResults(client)
	const res = await search<Album, AlbumRes, string>({
		exact: true,
		query: ALBUM_SEARCH,
		parseDoc: ({ title }) => title,
		parseRes: ({ albumSearch }) => albumSearch,
	})(album)
	return res[0]
}

const searchGenre = (client: Client) => async (genre: string) => {
	const search = getSearchResults(client)
	const res = await search<Genre, GenreRes, string>({
		exact: true,
		query: GENRE_SEARCH,
		parseDoc: ({ name }) => name,
		parseRes: ({ genreSearch }) => genreSearch,
	})(genre)
	return res[0]
}

const searchArtist = (client: Client) => async (artist: string) => {
	const search = getSearchResults(client)
	const res = await search<Artist, ArtistRes, string>({
		exact: true,
		query: ARTIST_SEARCH,
		parseDoc: ({ name }) => name,
		parseRes: ({ artistSearch }) => artistSearch,
	})(artist)
	return res[0]
}

const populateAlbum = (client: Client) => async (album: Album): Promise<Album> => {
	const artists = await Promise.all(album.artists.map(searchArtist(client)))
	return { ...album, artists }
}

const albumUploads = (client: Client, albums: Album[]) =>
	albums.map(({
		title,
		cover,
		artists,
		released,
	}) => client.mutate<Album, AlbumUpload>({
		mutation: ADD_ALBUM,
		variables: {
			title,
			artists,
			released,
			cover: cover!,
		},
	}))

const albumsToSongs = (albums: Album[]) =>
	albums.reduce<SongUpload[]>(
		(songs, album) => [
			...songs,
			...album.songs.map(
				({ songId, ...song }) => ({
					...song,
					album: album.title,
				}),
			),
		],
		[],
	)

const populateSong = (client: Client) => async (song: SongUpload): Promise<SongUpload> => {
	const album = await searchAlbum(client)(song.album)
	const genres = await Promise.all(song.genres.map(searchGenre(client)))
	const artists = await Promise.all(song.artists.map(searchArtist(client)))
	const remixers = await Promise.all(song.remixers.map(searchArtist(client)))
	const featuring = await Promise.all(song.featuring.map(searchArtist(client)))
	return { ...song, album, genres, artists, remixers, featuring }
}

const songUploads = (client: Client, songs: Song[]) =>
	songs.map(({ songId, ...song }) =>
		client.mutate<Song, SongUpload>({ mutation: ADD_SONG, variables: song }))

export const submit =
	(client: Client) =>
		async (artists: Artist[], genres: Genre[], albums: Album[]) => {
			try {
				// upload artists & genres
				await Promise.all(genreUploads(client, genres))
				await Promise.all(artistUploads(client, artists))

				// upload albums
				const albumsPopulated = await Promise.all(albums.map(populateAlbum(client)))
				await Promise.all(albumUploads(client, albumsPopulated))

				// upload songs
				const songs = albumsToSongs(albums)
				const songsPopulated = await Promise.all(songs.map(populateSong(client)))
				await Promise.all(songUploads(client, songsPopulated))
			} catch (error) {
				console.error(error)
			}
		}