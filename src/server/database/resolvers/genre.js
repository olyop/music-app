import { Song } from "../models/index.js"

import { resolver } from "../../helpers/misc.js"
import { serializeCollection } from "../../helpers/collection.js"

export default {
  songs: resolver(
    async ({ parent }) => {
      const { id } = parent
      const filter = { genres: id }
      const query = Song.find(filter).lean()
      const collection = await query.exec()
      return serializeCollection(collection)
    }
  )
}
