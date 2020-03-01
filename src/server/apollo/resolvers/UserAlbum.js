import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"
import { serializeDocument } from "../../helpers/collection.js"

const { User, Album } = database.models

export default {
  user: resolver(
    async ({ parent }) => {
      const { user } = parent
      const query = User.findById(user)
      const doc = await query.lean().exec()
      return serializeDocument(doc)
    }
  ),
  album: resolver(
    async ({ parent }) => {
      const { album } = parent
      const query = Album.findById(album)
      const doc = await query.lean().exec()
      return serializeDocument(doc)
    }
  ),
}
