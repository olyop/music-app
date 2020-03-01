import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"
import { serializeDocument, serializeCollection } from "../../helpers/collection.js"

const { User, Song, Play } = database.models

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
  plays: resolver(
    async ({ parent }) => {
      const { user, song } = parent
      const filter = { user, song }
      const query = Play.find(filter)
      const doc = await query.lean().exec()
      return serializeCollection(doc)
    }
  ),
  numOfPlays: resolver(
    async ({ parent }) => {
      const { user, song } = parent
      const filter = { user, song }
      const query = Play.find(filter)
      const collection = await query.lean().exec()
      return collection.length
    }
  )
}
