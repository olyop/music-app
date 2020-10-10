import {
	HttpLink,
	FieldPolicy,
	ApolloClient,
	TypePolicies,
	InMemoryCache,
	ApolloProvider,
	FieldMergeFunction,
} from "@apollo/client"

import isEmpty from "lodash/isEmpty"
import { createElement, FC } from "react"

import { Song, Album, Artist } from "./types"

const userMerge = <T,>(): FieldMergeFunction<T[]> =>
	(existing, incoming) =>
		(existing && isEmpty(incoming) && existing.length !== 1 ?
			existing : incoming)

const userDocs = <T,>(): FieldPolicy<T[]> =>
	({ merge: userMerge() })

const typePolicies: TypePolicies = {
	Query: {
		queryType: true,
		fields: {
			songs: { keyArgs: ["orderBy"] },
			albums: { keyArgs: ["orderBy"] },
			artists: { keyArgs: ["orderBy"] },
		},
	},
	User: {
		keyFields: ["userId"],
		fields: {
			prevs: userDocs<Song>(),
			nexts: userDocs<Song>(),
			afters: userDocs<Song>(),
			songs: userDocs<Song>(),
			albums: userDocs<Album>(),
			artists: userDocs<Artist>(),
		},
	},
	Song: { keyFields: ["songId"] },
	Play: { keyFields: ["playId"] },
	Album: { keyFields: ["albumId"] },
	Genre: { keyFields: ["genreId"] },
	Artist: { keyFields: ["artistId"] },
	Playlist: { keyFields: ["playlistId"] },
}

export const link = new HttpLink({ uri: "/graphql" })
export const cache = new InMemoryCache({ typePolicies })
export const client = new ApolloClient({ link, cache })

export const Provider: FC = ({ children }) => (
	<ApolloProvider client={client}>
		{children}
	</ApolloProvider>
)