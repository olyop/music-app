import ApolloServerExpress from "apollo-server-express"

import fs from "fs"
import path from "path"
import gql from "graphql-tag"
import resolvers from "./resolvers/index.js"
import { APOLLO_SERVER_OPTIONS } from "../globals.js"

const { ApolloServer } = ApolloServerExpress

const importTypeDefs = () => {
  const dirname = path.resolve()
  const folder = "/src/server/apollo"
  const file = "/typeDefs.graphql"
  const pathToFile = path.join(dirname, folder, file)
  const encoding = "utf8"
  const string = fs.readFileSync(pathToFile, encoding).toString()
  return gql`${string}`
}

const typeDefs = importTypeDefs()

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  ...APOLLO_SERVER_OPTIONS,
})

export default apolloServer
