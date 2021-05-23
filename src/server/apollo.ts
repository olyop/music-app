import {
	ApolloServer,
	ExpressContext,
	ContextFunction,
} from "apollo-server-express"

import typeDefs from "./typeDefs"
import resolvers from "./resolvers"

import { pg, s3, ag } from "./services"
import { Context, Services } from "./types"
import { APOLLO_SERVER_CONFIG } from "./globals"
import { determineAuthorization } from "./helpers"

const services: Services =
	{ pg, s3, ag }

const context: ContextFunction<ExpressContext, Context> =
	({ req }) => ({
		...services,
		authorization: determineAuthorization(req),
	})

const apollo =
	new ApolloServer({
		context,
		typeDefs,
		resolvers,
		...APOLLO_SERVER_CONFIG,
	})

export default apollo