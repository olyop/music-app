import ApolloServerExpress from "apollo-server-express"

import typeDefs from "./typeDefs"
import resolvers from "./resolvers/index.js"
import { APOLLO_SERVER_CONFIG } from "../globals/configs.js"

const { ApolloServer } = ApolloServerExpress

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	...APOLLO_SERVER_CONFIG,
})

export default apolloServer