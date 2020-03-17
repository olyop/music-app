import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"

import {
  determineUserSelect,
  determineSongSelect,
  determinePlaySelect,
} from "../../helpers/resolvers.js"

import {
  deserializeDocument,
  deserializeCollection,
} from "../../helpers/collections.js"

const { User, Song, Play } = database.models

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
  plays: resolver(
    async ({ info, parent: { user, song } }) => {
      const query =
        Play
          .find({ user, song })
          .select(determinePlaySelect(info))
          .lean()
          .exec()
      return deserializeCollection(await query)
    },
  ),
  numOfPlays: resolver(
    async ({ info, parent: { user, song } }) => {
      const query =
        Play
          .find({ user, song })
          .select(determinePlaySelect(info))
          .lean()
          .exec()
      return deserializeCollection(await query).length
    },
  ),
}
