/* eslint-disable import/no-extraneous-dependencies */
import {
	from,
	HttpLink,
	ApolloClient,
	TypePolicies,
	InMemoryCache,
	ApolloProvider,
	GraphQLRequest,
	FieldMergeFunction,
} from "@apollo/client"

import head from "lodash/head"
import isNull from "lodash/isNull"
import { createElement, FC } from "react"
import { onError } from "@apollo/client/link/error"
import { setContext } from "@apollo/client/link/context"
// import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist"

import { getJwt, removeJwt } from "./helpers"

const paginationMerge =
	(): FieldMergeFunction<unknown[]> =>
		(existing = [], incoming) =>
			[...existing, ...incoming]

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
			songs: {
				keyArgs: ["orderBy"],
				merge: paginationMerge(),
			},
			albums: {
				keyArgs: ["orderBy"],
				merge: paginationMerge(),
			},
			genres: {
				keyArgs: ["orderBy"],
				merge: paginationMerge(),
			},
			artists: {
				keyArgs: ["orderBy"],
				merge: paginationMerge(),
			},
			playlists: {
				keyArgs: ["orderBy"],
				merge: paginationMerge(),
			},
		},
	},
	Song: { keyFields: ["songId"] },
	Play: { keyFields: ["playId"] },
	Album: { keyFields: ["albumId"] },
	Genre: { keyFields: ["genreId"] },
	Artist: { keyFields: ["artistId"] },
	Playlist: { keyFields: ["playlistId"] },
}

const httpLink =
	new HttpLink()

interface Context {
	headers: Record<string, string>,
}

type ContextSetter =
	(req: GraphQLRequest, prev: Context) => Context

const contextSetter: ContextSetter =
	(_, { headers }) => ({
		headers: isNull(getJwt()) ? headers : {
			...headers,
			Authorization: `Bearer ${getJwt()}`,
		},
	})

const authLink =
	setContext(contextSetter)

const checkForAuthError =
	onError(
		// eslint-disable-next-line @typescript-eslint/naming-convention
		({ forward, operation, graphQLErrors }) => {
			const error = head(graphQLErrors)
			if (error?.message === "Unauthenticated") {
				removeJwt()
				location.reload()
			} else {
				forward(operation)
			}
		},
	)

const link =
	from([ authLink, checkForAuthError, httpLink ])

const cache =
	new InMemoryCache({ typePolicies });

// (async () => {
// 	await persistCache({
// 		cache,
// 		storage: new LocalStorageWrapper(window.localStorage),
// 	})
// })()

const client =
	new ApolloClient({ link, cache })

export const Provider: FC = ({ children }) => (
	<ApolloProvider client={client}>
		{children}
	</ApolloProvider>
)