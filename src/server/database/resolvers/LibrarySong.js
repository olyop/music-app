import { Library, Song } from "../models/index.js"

import { resolver } from "../../helpers/misc.js"
import { serializeDocument } from "../../helpers/collection.js"

export default {
  song: resolver(
    async ({ parent }) => {
      const { song } = parent
      const query = Song.findById(song)
      const collection = await query.lean().exec()
      return serializeDocument(collection)
    }
  ),
  library: resolver(
    async ({ parent }) => {
      const { id } = parent
      const filter = { songs: id }
      const query = Library.find(filter)
      const collection = await query.lean().exec()
      return serializeDocument(collection) 
    }
  ),
}
