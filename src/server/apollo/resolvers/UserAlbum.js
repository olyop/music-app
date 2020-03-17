import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"

import {
  determineUserSelect,
  determineAlbumSelect,
} from "../../helpers/resolvers.js"

import {
  deserializeDocument,
  deserializeCollection,
} from "../../helpers/collections.js"

const { User, Album, Play } = database.models

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
  album: resolver(
    async ({ info, parent: { album } }) => {
      const query =
        Album
          .findById(album)
          .select(determineAlbumSelect(info))
          .lean()
          .exec()
      return deserializeDocument(await query)
    },
  ),
  plays: resolver(
    async () => {
      const query =
        Play
          .find()
          .lean()
          .exec()
      return deserializeCollection(await query)
    },
  ),
  numOfPlays: resolver(
    async () => {
      return 1
    },
  ),
}
