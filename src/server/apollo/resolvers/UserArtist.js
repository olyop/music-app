import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"

import {
  determineUserSelect,
  determineArtistSelect,
} from "../../helpers/resolvers.js"

import {
  deserializeDocument,
  deserializeCollection,
} from "../../helpers/collections.js"

const { User, Artist, Play } = database.models

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
  artist: resolver(
    async ({ info, parent: { artist } }) => {
      const query =
        Artist
          .findById(artist)
          .select(determineArtistSelect(info))
          .lean()
          .exec()
      return deserializeDocument(await query)
    },
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
