import ApolloClient from "apollo-boost"

import { API_URL } from "../globals"

const client = new ApolloClient({
  uri: API_URL
})

export default client
