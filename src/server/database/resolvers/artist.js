import { Album, Song } from "../models/index.js"

import orderBy from "lodash/orderBy.js"
import { resolver } from "../../helpers/misc.js"
import { serializeCollection } from "../../helpers/collection.js"

export default {
  albums: resolver(
    async ({ parent }) => {
      const { id } = parent
      const query = Album.find({ artist: id })
      const result = await query.exec()
      return serializeCollection(result)
    }
  ),
  songs: resolver(
    async ({ parent }) => {
      const { id } = parent
      const result = await Promise.all([
        Song.find({ artists: id }).lean().exec(),
        Song.find({ remixers: id }).lean().exec(),
        Song.find({ featuring: id }).lean().exec()
      ])
      const songs = result.flat()
      const songsOrdered = orderBy(songs, "title", "asc")
      return serializeCollection(songsOrdered)
    }
  ),
}
