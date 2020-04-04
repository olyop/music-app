import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"
import { deserializeDocument } from "../../helpers/collections.js"

import {
  determineUserSelect,
  determineSongSelect,
} from "../../helpers/resolvers.js"

const { User, Song } = database.models

export default {
  user: resolver(
    async ({ parent }) => {
      const query =
        User.findById(parent.userId)
          .select(determineUserSelect(info))
          .lean()
          .exec()
      return deserializeDocument(await query)
    },
  ),
  song: resolver(
    async ({ parent }) => {
      const query =
        Song.findById(parent.songId)
          .select(determineSongSelect(info))
          .lean()
          .exec()
      return deserializeDocument(await query)
    },
  ),
}
