import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"
import { serializeDocument } from "../../helpers/collection.js"

const { User, Song } = database.models

export default {
  user: resolver(
    async ({ parent }) => {
      const { user } = parent
      const query = User.findById(user)
      const doc = await query.lean().exec()
      return serializeDocument(doc)
    }
  ),
  song: resolver(
    async ({ parent }) => {
      const { song } = parent
      const query = Song.findById(song)
      const doc = await query.lean().exec()
      return serializeDocument(doc)
    }
  ),
}
