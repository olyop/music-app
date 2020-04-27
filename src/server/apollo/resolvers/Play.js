import database from "../../database/index.js"
import resolver from "../../helpers/utilities/resolver.js"
import deserializeDocument from "../../helpers/mongodb/deserializeDocument.js"

const { User, Song } = database.models

export default {
  user: resolver(
    async ({ parent }) => {
      const query =
        User.findById(parent.userId)
            .select(userSelect(info))
            .lean()
            .exec()
      return deserializeDocument(await query)
    },
  ),
  song: resolver(
    async ({ parent }) => {
      const query =
        Song.findById(parent.songId)
            .select(songSelect(info))
            .lean()
            .exec()
      return deserializeDocument(await query)
    },
  ),
}
