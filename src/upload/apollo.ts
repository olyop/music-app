import { createUploadLink } from "apollo-upload-client"
import { ApolloClient, TypePolicies, InMemoryCache } from "@apollo/client"

const typePolicies: TypePolicies = {
	Song: { keyFields: ["songId"] },
	Album: { keyFields: ["albumId"] },
	Genre: { keyFields: ["genreId"] },
	Artist: { keyFields: ["artistId"] },
}

const link = createUploadLink({ uri: "/graphql" })
const cache = new InMemoryCache({ typePolicies })
// @ts-ignore
const client = new ApolloClient({ link, cache })

export default client