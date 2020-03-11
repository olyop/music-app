import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"

import {
  determineSongSelect,
  deserializeCollection,
} from "../../helpers/resolvers.js"

const { Song } = database.models

export default {
  songs: resolver(
    async ({ info, parent: { id } }) => {
      const filter = { genres: id }
      const sortArgs = { title: "asc" }
      const query = Song.find(filter).sort(sortArgs)
      const select = determineSongSelect(info)
      const collection = await query.select(select).lean().exec()
      return deserializeCollection(collection)
    }
  )
}
