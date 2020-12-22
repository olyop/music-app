import { ApolloServer } from "apollo-server-express"

import typeDefs from "./typeDefs"
import resolvers from "./resolvers"

import { Context } from "./types"
import { pg, s3, ag } from "./services"
import { APOLLO_SERVER_CONFIG } from "./globals"

const context: Context = {
	pg,
	s3,
	tokens: [],
	ag: ag.initIndex("search"),
}

export default new ApolloServer({
	context,
	typeDefs,
	resolvers,
	...APOLLO_SERVER_CONFIG,
})