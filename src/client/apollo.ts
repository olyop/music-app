import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createUploadLink } from "apollo-upload-client"

import { determineDocId } from "./helpers"

const SERVER_URL = process.env.NODE_ENV === "production" ?
	"" : `http://${process.env.HOST!}:${process.env.PORT!}`

const API_URL = `${SERVER_URL}/graphql`

const dataIdFromObject = <T>(doc: T) => determineDocId(doc)

const link = createUploadLink({ uri: API_URL })
const cache = new InMemoryCache({ dataIdFromObject })
const client = new ApolloClient({ link, cache })

export default client