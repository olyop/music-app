import { Artist, Song } from "../models/index.js"

import { serializeCollection } from "../../helpers/collection.js"

export default {
  artists: async ({ artists }) => {
    const query = id => Artist.findById(id).lean().exec()
    const queries = artists.map(query)
    const result = await Promise.all(queries)
    return serializeCollection(result)
  },
  songs: async ({ id }) => {
    const query = Song.find({ album: id }).lean().exec()
    const result = await query
    return serializeCollection(result)
  }
}
