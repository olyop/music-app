import { ApolloServer } from "apollo-server-express"

import typeDefs from "./typeDefs"
import resolvers from "./resolvers"
import { APOLLO_SERVER_CONFIG } from "../globals"

const apollo = new ApolloServer({
	typeDefs,
	resolvers,
	...APOLLO_SERVER_CONFIG,
})

export default apollo