import fs from "fs"
import gql from "graphql-tag"

import ApolloServerExpress from "apollo-server-express"

import resolvers from "./resolvers/index.js"
import { APOLLO_SERVER_OPTIONS, TYPE_DEFS_PATH } from "../globals.js"

const { ApolloServer } = ApolloServerExpress

// import typeDefs
const typeDefs = gql`${fs.readFileSync(TYPE_DEFS_PATH).toString()}`

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  ...APOLLO_SERVER_OPTIONS,
})

export default apolloServer
