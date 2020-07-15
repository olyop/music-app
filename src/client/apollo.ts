import { createUploadLink } from "apollo-upload-client"
import { ApolloClient, InMemoryCache, TypePolicies } from "@apollo/client"

const typePolicies: TypePolicies = {
	User: { keyFields: ["userId"] },
	Song: { keyFields: ["songId"] },
	Play: { keyFields: ["playId"] },
	Album: { keyFields: ["albumId"] },
	Genre: { keyFields: ["genreId"] },
	Artist: { keyFields: ["artistId"] },
	Playlist: { keyFields: ["playlistId"] },
}

// @ts-ignore
const cache = new InMemoryCache({ typePolicies })
const link = createUploadLink({ uri: "/graphql" })

// @ts-ignore
const client = new ApolloClient({ link, cache })

export default client