import {
	HttpLink,
	FieldPolicy,
	ApolloClient,
	TypePolicies,
	InMemoryCache,
	FieldMergeFunction,
} from "@apollo/client"

import { concatPagination } from "@apollo/client/utilities"

import isEmpty from "lodash/isEmpty"

import { Song, Album, Artist } from "./types"

const userMerge: FieldMergeFunction =
	<E, I>(existing: E[] = [], incoming: I[]) =>
		(isEmpty(incoming) && existing.length !== 1 ? existing : incoming)

const userSongs: FieldPolicy<Song[]> = ({ merge: userMerge })
const userAlbums: FieldPolicy<Album[]> = ({ merge: userMerge })
const userArtists: FieldPolicy<Artist[]> = ({ merge: userMerge })

const typePolicies: TypePolicies = {
	User: {
		fields: {
			songs: userSongs,
			albums: userAlbums,
			artists: userArtists,
		},
		keyFields: ["userId"],
	},
	Query: {
		fields: {
			songs: concatPagination<Song>(),
			albums: concatPagination<Album>(),
			artists: concatPagination<Artist>(),
		},
	},
	Song: { keyFields: ["songId"] },
	Play: { keyFields: ["playId"] },
	Album: { keyFields: ["albumId"] },
	Genre: { keyFields: ["genreId"] },
	Artist: { keyFields: ["artistId"] },
	Playlist: { keyFields: ["playlistId"] },
}

const link = new HttpLink({ uri: "/graphql" })
const cache = new InMemoryCache({ typePolicies })
const client = new ApolloClient({ link, cache })

export default client