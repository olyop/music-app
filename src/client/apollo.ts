/* eslint-disable node/no-process-env */
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createUploadLink } from "apollo-upload-client"

import { dataIdFromObject } from "./helpers"

const link = createUploadLink({ uri: "/graphql" })
const cache = new InMemoryCache({ dataIdFromObject })
const client = new ApolloClient({ link, cache })

export default client