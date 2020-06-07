import Apollo from "apollo-server-express"

import typeDefs from "./typeDefs"
import resolvers from "./resolvers"
import { APOLLO_SERVER_CONFIG } from "../globals"

const apolloServer = new Apollo.ApolloServer({
	typeDefs,
	resolvers,
	...APOLLO_SERVER_CONFIG,
})

export default apolloServer