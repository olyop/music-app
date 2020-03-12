import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"

import {
  deserializeDocument,
  determineUserSelect,
  determineAlbumSelect,
  deserializeCollection,
} from "../../helpers/resolvers.js"

const { User, Album, Play } = database.models

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
  album: resolver(
    async ({ info, parent: { album } }) => await (
      Album
        .findById(album)
        .select(determineAlbumSelect(info))
        .lean()
        .map(deserializeDocument)
        .exec()
    ),
  ),
  plays: resolver(
    async () => await (
      Play
        .find()
        .lean()
        .map(deserializeCollection)
        .exec()
    ),
  ),
  numOfPlays: resolver(
    async () => {
      return 1
    },
  ),
}
