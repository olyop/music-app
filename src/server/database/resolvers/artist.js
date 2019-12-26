import { Album, Song } from "../models/index.js"

import mongoose from "mongoose"
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
      const artists = Song.find({ artists: mongoose.Schema.ObjectId(id) }).lean().exec()
      const remixers = Song.find({ remixers: mongoose.Schema.ObjectId(id) }).lean().exec()
      const featuring = Song.find({ featuring: mongoose.Schema.ObjectId(id) }).lean().exec()
      const artists = await Promise.all([ artists, remixers, featuring ])
      return artists.flat()
    }
  ),
}
