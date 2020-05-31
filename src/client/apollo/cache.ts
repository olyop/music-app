import { InMemoryCache } from "apollo-cache-inmemory"

import { Doc } from "../types"
import { determineDocIdKey } from "../helpers"

const cache = new InMemoryCache({
	dataIdFromObject: (doc: Doc) => doc[determineDocIdKey(doc)],
})

export default cache