import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"

import {
  deserializeDocument,
  determineUserSelect,
  determineArtistSelect,
  deserializeCollection,
} from "../../helpers/resolvers.js"

const { User, Artist, Play } = database.models

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
  artist: resolver(
    async ({ info, parent: { artist } }) => await (
      Artist
        .findById(artist)
        .select(determineArtistSelect(info))
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
