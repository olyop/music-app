import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"

import {
  determineSongSelect,
  deserializeCollection
} from "../../helpers/resolvers.js"

const { Song } = database.models

export default {
  songs: resolver(
    async ({ info, parent: { songs } }) => {
      const filter = { _id: songs }
      const sortArgs = { name: "asc" }
      const query = Song.find(filter).sort(sortArgs)
      const select = determineSongSelect(info)
      const collection = await query.select(select).lean().exec()
      return deserializeCollection(collection)
    },
  ),
}
