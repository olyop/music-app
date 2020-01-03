import { HttpLink } from "apollo-link-http"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"

import { API_URL } from "./globals"

const cache = new InMemoryCache({
  dataIdFromObject: ({ id }) => id,
})

const link = new HttpLink({
  uri: API_URL,
})

const apolloClient = new ApolloClient({
  link,
  cache,
})

export default apolloClient
