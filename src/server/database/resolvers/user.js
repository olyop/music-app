import { Song, Library } from "../models/index.js"

import { resolver } from "../../helpers/misc.js"
import { serializeDocument } from "../../helpers/collection.js"

export default {
  nowPlaying: resolver(
    async ({ parent }) => {
      const { nowPlaying } = parent
      const query = Song.findById(nowPlaying)
      const doc = await query.lean().exec()
      return serializeDocument(doc)
    }
  ),
  library: resolver(
    async ({ parent }) => {
      const { library } = parent
      const query = Library.findById(library)
      const doc = await query.lean().exec()
      return serializeDocument(doc)
    }
  ),
}
