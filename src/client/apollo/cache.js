import { determineDocIdKey } from "../helpers"
import { InMemoryCache } from "apollo-cache-inmemory"

const cache = new InMemoryCache({
  dataIdFromObject: doc => doc[determineDocIdKey(doc)],
})

export default cache
