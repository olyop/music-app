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
    async ({ info, parent: { user } }) => await (
      User
        .findById(user)
        .select(determineUserSelect(info))
        .lean()
        .map(deserializeDocument)
        .exec()
    ),
  ),
  song: resolver(
    async ({ info, parent: { song } }) => await (
      Song
        .findById(song)
        .select(determineSongSelect(info))
        .lean()
        .map(deserializeDocument)
        .exec()
    ),
  ),
}
