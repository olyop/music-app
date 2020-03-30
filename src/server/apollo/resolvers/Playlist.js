import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"
import { determineSongSelect } from "../../helpers/resolvers.js"
import { deserializeCollection } from "../../helpers/collections.js"

const { Song } = database.models

export default {
  songs: resolver(
    async ({ info, parent: { songs } }) => {
      const query =
        Song.find({ _id: songs })
          .sort({ name: "asc" })
          .select(determineSongSelect(info))
          .lean()
          .exec()
      return deserializeCollection(await query)
    },
  ),
}
