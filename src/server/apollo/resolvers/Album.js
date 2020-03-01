import database from "../../database/index.js"
import { pipe, resolver } from "../../helpers/misc.js"
import { restoreOrder, serializeCollection } from "../../helpers/collection.js"

const { Artist, Song } = database.models

export default {
  artists: resolver(
    async ({ parent }) => {
      const { artists } = parent
      const filter = { _id: { $in: artists } }
      const query = Artist.find(filter)
      const collection = await query.lean().exec()
      return pipe(collection)(
        serializeCollection,
        restoreOrder(artists),
      )
    }
  ),
  songs: resolver(
    async ({ parent }) => {
      const { id } = parent
      const filter = { album: id }
      const sortArgs = { discNumber: "asc", trackNumber: "asc" }
      const query = Song.find(filter).sort(sortArgs)
      const collection = await query.lean().exec()
      return serializeCollection(collection)
    }
  ),
}
