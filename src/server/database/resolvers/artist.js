import { Album, Song } from "../models/index.js"

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
      const songs = await Promise.all([
        Song.find({ artists: id }).lean().exec(),
        Song.find({ remixers: id }).lean().exec(),
        Song.find({ featuring: id }).lean().exec()
      ])
      return serializeCollection(songs.flat())
    }
  ),
}
