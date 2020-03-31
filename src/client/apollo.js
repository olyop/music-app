import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createUploadLink } from "apollo-upload-client"

import { API_URL } from "./globals"

export const cache = new InMemoryCache({
  dataIdFromObject: ({ id }) => id,
})

export const link = createUploadLink({
  uri: API_URL,
})

export const client = new ApolloClient({
  link,
  cache,
})
