import typeDefs from "./typeDefs/index.js"
import resolvers from "./resolvers/index.js"
import ApolloServerExpress from "apollo-server-express"
import { APOLLO_SERVER_CONFIG } from "../globals/configs.js"

const { ApolloServer } = ApolloServerExpress

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  ...APOLLO_SERVER_CONFIG,
})

export default apolloServer
