import ApolloServerExpress from "apollo-server-express"

import typeDefs from "./typeDefs.js"
import resolvers from "./resolvers/index.js"

const { ApolloServer } = ApolloServerExpress

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

export default apolloServer
