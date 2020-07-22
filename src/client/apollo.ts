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

const merge: FieldMergeFunction =
	<E, I>(existing: E[] = [], incoming: I[]) =>
		(isEmpty(incoming) && existing.length !== 1 ? existing : incoming)

const songs: FieldPolicy<Song[]> = ({ merge })
const albums: FieldPolicy<Album[]> = ({ merge })
const artists: FieldPolicy<Artist[]> = ({ merge })

const typePolicies: TypePolicies = {
	User: {
		keyFields: ["userId"],
		fields: { songs, albums, artists },
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