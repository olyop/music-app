import { Artist, Song } from "../models/index.js"

import { resolver } from "../../helpers/misc.js"
import { serializeCollection } from "../../helpers/collection.js"

export default {
  artists: resolver(
    async ({ parent }) => {
      const query = Artist.find({ "_id": { $in: parent.artists } })
      const artists = await query.lean().exec()
      return serializeCollection(artists)
    }
  ),
  songs: resolver(
    async ({ parent }) => {
      const { id } = parent
      const query = Song.find({ album: id }).lean().exec()
      const songs = await query
      return serializeCollection(songs)
    }
  ),
}
