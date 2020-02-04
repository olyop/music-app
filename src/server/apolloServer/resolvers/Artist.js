import flatten from "lodash/flatten.js"
import orderBy from "lodash/fp/orderBy.js"
import database from "../../database/index.js"
import { pipe, resolver } from "../../helpers/misc.js"
import { serializeCollection, removeDup } from "../../helpers/collection.js"

const { Album, Song } = database.models

export default {
  albums: resolver(
    async ({ parent }) => {
      const { id } = parent
      const filter = { artists: id }
      const query = Album.find(filter).lean()
      const collection = await query.exec()
      return pipe(collection)(
        serializeCollection,
        orderBy("released","desc"),
      )
    },
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
    },
  ),
}
