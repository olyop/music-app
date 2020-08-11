/* eslint-disable no-restricted-syntax */
import type { ApolloClient } from "@apollo/client"

// import ADD_SONG from "../graphql/addSong.gql"
// import ADD_ALBUM FROM "../graphql/addAlbum.gql"
// import ADD_GENRE from "../graphql/addGenre.gql"
import ADD_ARTIST from "../graphql/addArtist.gql"

import { dataUrlToBlob } from "./dataUrlToBlob"
import { Artist, UploadArtist, Genre, Album } from "../types"

export const submit =
	(client: ApolloClient<unknown>) =>
		async (artists: Artist[], _genres: Genre[], _albums: Album[]) => {
			try {
				const uploadArtists: UploadArtist[] =
					artists.map(({ name, photo }) => ({ name, photo: dataUrlToBlob(photo!) }))
				const artistsMutations =
					uploadArtists.map(variables => client.mutate<Artist>({ mutation: ADD_ARTIST, variables }))
				for await (const addArtist of artistsMutations) {
					console.log(addArtist)
				}
			} catch (error) {
				console.error(error)
			}
		}