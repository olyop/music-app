import { ApolloServer } from "apollo-server-express"

import typeDefs from "./typeDefs"
import resolvers from "./resolvers"

import { APOLLO_SERVER_CONFIG } from "./globals"

export default new ApolloServer({
	typeDefs,
	resolvers,
	cacheControl: true,
	...APOLLO_SERVER_CONFIG,
})