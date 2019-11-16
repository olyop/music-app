import { Song } from "../models/index.js"

import { serializeCollection } from "../../helpers/collection.js"

export default {
  songs: async ({ id }) => {
    const query = Song.find({ genre: id }).lean().exec()
    const result = await query
    return serializeCollection(result)
  }
}
