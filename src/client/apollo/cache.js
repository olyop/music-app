import { InMemoryCache } from "apollo-cache-inmemory"

const cache = new InMemoryCache({
  dataIdFromObject: ({ id }) => id,
})

export default cache
