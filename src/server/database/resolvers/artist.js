import { Album, Song } from "../models/index.js"

import { serializeCollection } from "../../helpers/collection.js"

export default {
  albums: async ({ id }) => {
    const query = Album.find({ artist: id })
    const result = await query.exec()
    return serializeCollection(result)
  },
  songs: async ({ id }) => {
    const query = Song.find({ artist: id }).lean().exec()
    const result = await query
    return serializeCollection(result)
  }
}
