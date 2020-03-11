import ApolloServerExpress from "apollo-server-express"

import typeDefs from "./typeDefs.js"
import resolvers from "./resolvers/index.js"
import { APOLLO_SERVER_OPTIONS } from "../globals.js"

const { ApolloServer } = ApolloServerExpress

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  ...APOLLO_SERVER_OPTIONS,
})

export default apolloServer
