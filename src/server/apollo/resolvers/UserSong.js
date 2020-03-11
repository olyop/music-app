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
    async ({ info, parent: { user } }) => {
      const query = User.findById(user)
      const select = determineUserSelect(info)
      const doc = await query.select(select).lean().exec()
      return deserializeDocument(doc)
    },
  ),
  song: resolver(
    async ({ parent: { song } }) => {
      const query = Song.findById(song)
      const select = determineSongSelect(info)
      const doc = await query.select(select).lean().exec()
      return deserializeDocument(doc)
    },
  ),
  plays: resolver(
    async ({ parent: { user, song } }) => {
      const filter = { user, song }
      const query = Play.find(filter)
      const select = determinePlaySelect(info)
      const collection = await query.select(select).lean().exec()
      return deserializeCollection(collection)
    },
  ),
  numOfPlays: resolver(
    async ({ parent: { user, song } }) => {
      const filter = { user, song }
      const query = Play.find(filter)
      const select = determinePlaySelect(info)
      const collection = await query.select(select).lean().exec()
      return deserializeCollection(collection).length
    },
  ),
}
