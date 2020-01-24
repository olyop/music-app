import { User, LibrarySong } from "../models/index.js"

import { resolver } from "../../helpers/misc.js"
import { serializeCollection, serializeDocument } from "../../helpers/collection.js"

export default {
  songs: resolver(
    async ({ parent }) => {
      const { songs } = parent
      const filter = { _id: { $in: songs } }
      const query = LibrarySong.find(filter)
      const collection = await query.lean().exec()
      return serializeCollection(collection)
    }
  ),
  user: resolver(
    async ({ parent }) => {
      const { id } = parent
      const filter = { library: id }
      const query = User.find(filter)
      const doc = await query.lean().exec()
      return serializeDocument(doc) 
    }
  ),
}
