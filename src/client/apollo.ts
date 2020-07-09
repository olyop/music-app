import { createUploadLink } from "apollo-upload-client"
import { ApolloClient, InMemoryCache } from "@apollo/client"

import { dataIdFromObject } from "./helpers"

const link = createUploadLink({ uri: "/graphql" })
const cache = new InMemoryCache({ dataIdFromObject })
// @ts-ignore
const client = new ApolloClient({ link, cache })

export default client