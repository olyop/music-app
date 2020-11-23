import {
	HttpLink,
	ApolloClient,
	TypePolicies,
	InMemoryCache,
	ApolloProvider,
} from "@apollo/client"

import { createElement, FC } from "react"

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

export const link = new HttpLink({ uri: "/graphql" })
export const cache = new InMemoryCache({ typePolicies })
export const client = new ApolloClient({ link, cache })

export const Provider: FC = ({ children }) => (
	<ApolloProvider client={client}>
		{children}
	</ApolloProvider>
)