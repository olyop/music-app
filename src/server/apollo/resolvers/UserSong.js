import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"

import {
  deserializeDocument,
  determineUserSelect,
  determineSongSelect,
  determinePlaySelect,
  deserializeCollection,
} from "../../helpers/resolvers.js"

const { User, Song, Play } = database.models

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
    async ({ parent: { song } }) => await (
      Song
        .findById(song)
        .select(determineSongSelect(info))
        .lean()
        .map(deserializeDocument)
        .exec()
    ),
  ),
  plays: resolver(
    async ({ info, parent: { user, song } }) => await (
      Play
        .find({ user, song })
        .select(determinePlaySelect(info))
        .lean()
        .map(deserializeCollection)
        .exec()
    ),
  ),
  numOfPlays: resolver(
    async ({ info, parent: { user, song } }) => await (
      Play
        .find({ user, song })
        .select(determinePlaySelect(info))
        .lean()
        .map(collection => collection.length)
        .exec()
    ),
  ),
}
