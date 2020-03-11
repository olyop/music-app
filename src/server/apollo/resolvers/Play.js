import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"

import {
  deserializeDocument,
  determineUserSelect,
  determineSongSelect,
} from "../../helpers/resolvers.js"

const { User, Song } = database.models

export default {
  user: resolver(
    async ({ info, parent: { user } }) => {
      const query = User.findById(user)
      const select = determineUserSelect(info)
      const doc = await query.select(select).lean().exec()
      return deserializeDocument(doc)
    }
  ),
  song: resolver(
    async ({ info, parent: { song } }) => {
      const query = Song.findById(song)
      const select = determineSongSelect(info)
      const doc = await query.select(select).lean().exec()
      return deserializeDocument(doc)
    }
  ),
}
