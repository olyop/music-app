import ApolloServerExpress from "apollo-server-express"

import resolvers from "./resolvers/index.js"
import { APOLLO_SERVER_OPTIONS } from "../globals.js"
import importTypeDefs from "../helpers/importTypeDefs.js"

const { ApolloServer } = ApolloServerExpress

const typeDefs = importTypeDefs()

const options = {
  typeDefs, resolvers,
  ...APOLLO_SERVER_OPTIONS,
}

const apolloServer = new ApolloServer(options)

export default apolloServer
