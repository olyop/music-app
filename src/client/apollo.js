import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createUploadLink } from "apollo-upload-client"

import { API_URL } from "./globals"

const cache = new InMemoryCache({
  dataIdFromObject: ({ id }) => id,
})

const link = createUploadLink({
  uri: API_URL,
})

const client = new ApolloClient({
  link,
  cache,
})

export default client
