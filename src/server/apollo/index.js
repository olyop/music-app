import ApolloServerExpress from "apollo-server-express"

import resolvers from "./resolvers/index.js"
import { APOLLO_SERVER_OPTIONS } from "../globals.js"
import importTypeDefs from "../helpers/importTypeDefs.js"

const { ApolloServer } = ApolloServerExpress

const apolloServer = new ApolloServer({
  resolvers,
  ...APOLLO_SERVER_OPTIONS,
  typeDefs: importTypeDefs(),
})

export default apolloServer
