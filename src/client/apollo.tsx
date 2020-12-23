import {
	from,
	HttpLink,
	ApolloClient,
	TypePolicies,
	InMemoryCache,
	ApolloProvider,
} from "@apollo/client"

import { createElement, FC } from "react"
import { setContext } from "@apollo/client/link/context"

const typePolicies: TypePolicies = {
	Query: {
		queryType: true,
		fields: {
			songs: { keyArgs: ["orderBy"] },
			albums: { keyArgs: ["orderBy"] },
			artists: { keyArgs: ["orderBy"] },
		},
	},
	User: { keyFields: ["userId"] },
	Song: { keyFields: ["songId"] },
	Play: { keyFields: ["playId"] },
	Album: { keyFields: ["albumId"] },
	Genre: { keyFields: ["genreId"] },
	Artist: { keyFields: ["artistId"] },
	Playlist: { keyFields: ["playlistId"] },
}

const httpLink = new HttpLink({
	uri: "/graphql",
	headers: { authorization: localStorage.getItem("authorization") },
})

const authLink = setContext(() => ({
	headers: {
		authorization: localStorage.getItem("authorization"),
	},
}))

const link = from([ authLink, httpLink ])

const cache = new InMemoryCache({ typePolicies })

const client = new ApolloClient({ link, cache })

export const Provider: FC = ({ children }) => (
	<ApolloProvider client={client}>
		{children}
	</ApolloProvider>
)