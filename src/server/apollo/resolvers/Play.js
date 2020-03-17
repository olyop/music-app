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
    async ({ info, parent: { user } }) => {
      const query =
        User
          .findById(user)
          .select(determineUserSelect(info))
          .lean()
          .exec()
      return deserializeDocument(await query)
    },
  ),
  song: resolver(
    async ({ info, parent: { song } }) => {
      const query =
        Song
          .findById(song)
          .select(determineSongSelect(info))
          .lean()
          .exec()
      return deserializeDocument(await query)
    },
  ),
}
