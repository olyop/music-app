import {
	HttpLink,
	FieldPolicy,
	ApolloClient,
	TypePolicies,
	InMemoryCache,
	FieldMergeFunction,
} from "@apollo/client"

import isEmpty from "lodash/isEmpty"

import { Song, Album, Artist } from "./types"

const userMerge = <T>(): FieldMergeFunction<T[]> =>
	(existing, incoming) =>
		(existing && isEmpty(incoming) && existing.length !== 1 ? existing : incoming)

// const feedMerge = <T>(): FieldMergeFunction<T[]> =>
// 	(existing = [], incoming) => [...existing, ...incoming]

const userDocs = <T>(): FieldPolicy<T[]> =>
	({ merge: userMerge() })

// const queryDocs = <T>(): FieldPolicy<T[]> =>
// 	({ merge: feedMerge() })

const typePolicies: TypePolicies = {
	User: {
		keyFields: ["userId"],
		fields: {
			songs: userDocs<Song>(),
			albums: userDocs<Album>(),
			artists: userDocs<Artist>(),
		},
	},
	// Query: {
	// 	fields: {
	// 		songs: queryDocs<Song>(),
	// 		albums: queryDocs<Album>(),
	// 		artists: queryDocs<Artist>(),
	// 	},
	// },
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