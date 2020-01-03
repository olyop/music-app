import { Album, Song } from "../models/index.js"

import flatten from "lodash/flatten.js"
import orderBy from "lodash/fp/orderBy.js"
import { pipe, resolver } from "../../helpers/misc.js"
import { serializeCollection, removeDup } from "../../helpers/collection.js"

export default {
  albums: resolver(
    async ({ parent }) => {
      const { id } = parent
      const filter = { artists: id }
      const query = Album.find(filter)
      const collection = await query.lean().exec()
      return serializeCollection(collection)
    }
  ),
  songs: resolver(
    async ({ parent }) => {
      const { id } = parent
      const fields = ["artists", "remixers", "featuring"]
      const query = key => Song.find({ [key]: id })
      const queries = fields.map(field => query(field).lean().exec())
      const collection = await Promise.all(queries)
      return pipe(collection)(
        flatten,
        serializeCollection,
        removeDup,
        orderBy("title","asc"),
      )
    }
  ),
}
