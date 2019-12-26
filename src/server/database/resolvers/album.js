import { Artist, Song } from "../models/index.js"

import { resolver } from "../../helpers/misc.js"
import { serializeCollection } from "../../helpers/collection.js"

export default {
  artists: resolver(
    async ({ parent }) => {
      const query = id => Artist.findById(id).lean().exec()
      const queries = parent.artists.map(query)
      const artists = await Promise.all(queries)
      return serializeCollection(artists)
    }
  ),
  songs: resolver(
    async ({ parent }) => {
      const { id } = parent
      const query = Song.find({ album: id })
      const songs = await query.lean().exec()
      return serializeCollection(songs)
    }
  ),
}
