import { Album, Song } from "../models/index.js"

import {
  pipe,
  resolver,
} from "../../helpers/misc.js"

import flatten from "lodash/flatten.js"
import orderBy from "lodash/fp/orderBy.js"
import { serializeCollection } from "../../helpers/collection.js"

export default {
  albums: resolver(
    async ({ parent }) => {
      const { id } = parent
      const filter = { artists: id }
      const query = Album.find(filter).lean()
      const collection = await query.exec()
      return serializeCollection(collection)
    }
  ),
  songs: resolver(
    async ({ parent }) => {
      const { id } = parent
      const fields = ["artists", "remixers", "featuring"]
      const query = key => Song.find({ [key]: id }).lean()
      const queries = fields.map(field => query(field).exec())
      const collection = await Promise.all(queries)
      return pipe(collection)(
        flatten,
        orderBy("title", "asc"),
        serializeCollection
      )
    }
  ),
}
