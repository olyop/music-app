import { ApolloServer, makeExecutableSchema } from "apollo-server-express"

import typeDefs from "./typeDefs"
import resolvers from "./resolvers"
import { APOLLO_SERVER_CONFIG } from "../globals"

const schema = makeExecutableSchema({ typeDefs, resolvers })
const apollo = new ApolloServer({ schema, ...APOLLO_SERVER_CONFIG })

export default apollo