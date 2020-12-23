import { ApolloServer, ContextFunction, ExpressContext } from "apollo-server-express"

import typeDefs from "./typeDefs"
import resolvers from "./resolvers"

import { Context } from "./types"
import { pg, s3, ag } from "./services"
import { APOLLO_SERVER_CONFIG } from "./globals"

const context: ContextFunction<ExpressContext, Context> = ({ req }) => ({
	pg,
	s3,
	ag: ag.initIndex("search"),
	authorization: req.headers.authorization || null,
})

export default new ApolloServer({
	context,
	typeDefs,
	resolvers,
	...APOLLO_SERVER_CONFIG,
})