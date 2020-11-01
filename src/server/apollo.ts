import { ApolloServer } from "apollo-server-express"

import typeDefs from "./typeDefs"
import resolvers from "./resolvers"

import { Context } from "./types"
import { pg, s3, ag } from "./services"
import { APOLLO_SERVER_CONFIG } from "./globals"

const context: Context = { pg, ag, s3 }

export default new ApolloServer({
	context,
	typeDefs,
	resolvers,
	cacheControl: true,
	...APOLLO_SERVER_CONFIG,
})