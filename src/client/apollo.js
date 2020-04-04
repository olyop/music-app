import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createUploadLink } from "apollo-upload-client"

import { API_URL, USER_ID } from "./globals"
import USER_INIT_FRAG from "./graphql/fragments/userInitFrag.graphql"

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

client.writeFragment({
  id: USER_ID,
  fragment: USER_INIT_FRAG,
  data: {
    songs: [],
    albums: [],
    artists: [],
    playlists: [],
    __typename: "User",
  },
})

export default client
