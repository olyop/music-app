import { Song } from "../models/index.js"

import { serializeCollection } from "../../helpers/collection.js"

export default {
  songs: async ({ id }) => {
    const query = Song.find({ genre: id }).lean()
    const result = await query.exec()
    return serializeCollection(result)
  }
}
