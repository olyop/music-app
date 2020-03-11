import database from "../../database/index.js"
import { pipe, resolver } from "../../helpers/misc.js"

import {
  restoreOrder,
  determineSongSelect,
  determineArtistSelect,
  deserializeCollection,
} from "../../helpers/resolvers.js"

const { Artist, Song } = database.models

export default {
  artists: resolver(
    async ({ info, parent: { artists } }) => {
      const filter = { _id: artists }
      const query = Artist.find(filter)
      const select = determineArtistSelect(info)
      const collection = await query.select(select).lean().exec()
      return pipe(collection)(
        deserializeCollection,
        restoreOrder(artists),
      )
    }
  ),
  songs: resolver(
    async ({ info, parent: { id } }) => {
      const filter = { album: id }
      const sortArgs = { discNumber: "asc", trackNumber: "asc" }
      const query = Song.find(filter).sort(sortArgs)
      const select = determineSongSelect(info)
      const collection = await query.select(select).lean().exec()
      return deserializeCollection(collection)
    }
  ),
}
