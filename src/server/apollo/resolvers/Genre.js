import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"
import { serializeCollection } from "../../helpers/collection.js"

const { Song } = database.models

export default {
  songs: resolver(
    async ({ parent }) => {
      const { id } = parent
      const filter = { genres: id }
      const sortArgs = { title: "asc" }
      const query = Song.find(filter).sort(sortArgs)
      const collection = await query.lean().exec()
      return serializeCollection(collection)
    }
  )
}
