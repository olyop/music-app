/* eslint-disable no-restricted-syntax */
import type { ApolloClient } from "@apollo/client"

import {
	Song,
	Genre,
	Album,
	Artist,
	UploadSong,
	UploadGenre,
	UploadAlbum,
	UploadArtist,
} from "../types"

// import ADD_SONG from "../graphql/addSong.gql"
import ADD_ALBUM from "../graphql/addAlbum.gql"
import ADD_GENRE from "../graphql/addGenre.gql"
import ADD_ARTIST from "../graphql/addArtist.gql"

import { dataUrlToBlob } from "./dataUrlToBlob"

type Client = ApolloClient<unknown>

const genreUploads = (client: Client, genres: Genre[]) =>
	genres.map(({ name }) => client.mutate<Artist, UploadGenre>({
		mutation: ADD_GENRE,
		variables: { name },
	}))

const artistUploads = (client: Client, artists: Artist[]) =>
	artists.map(({ name, photo }) => client.mutate<Artist, UploadArtist>({
		mutation: ADD_ARTIST,
		variables: { name, photo: dataUrlToBlob(photo!) },
	}))

const albumUploads = (client: Client, albums: Album[]) =>
	albums.map(({ title, cover, released }) => client.mutate<Album, UploadAlbum>({
		mutation: ADD_ALBUM,
		variables: { title, released, cover: dataUrlToBlob(cover!) },
	}))

const songUploads = (client: Client, songs: Song[]) =>
	songs.map(({
		title,
	}) => client.mutate<Song, UploadSong>({
		mutation: ADD_ALBUM,
		variables: {
			
		},
	}))

export const submit =
	(client: Client) =>
		async (artists: Artist[], genres: Genre[], albums: Album[]) => {
			try {
				await Promise.all(genreUploads(client, genres))
				await Promise.all(artistUploads(client, artists))
				await Promise.all(albumUploads(client, albums))
			} catch (error) {
				console.error(error)
			}
		}