import { Song } from "../models/index.js"

import { resolver } from "../../helpers/misc.js"
import { serializeCollection } from "../../helpers/collection.js"

export default {
  songs: resolver(
    async ({ parent }) => {
      const { id } = parent
      const query = Song.find({ genre: id })
      const songs = await query.lean().exec()
      return serializeCollection(songs)
    }
  )
}
