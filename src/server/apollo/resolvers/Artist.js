import flatten from "lodash/flatten.js"
import orderBy from "lodash/fp/orderBy.js"
import database from "../../database/index.js"
import { pipe, resolver } from "../../helpers/misc.js"
import { SONG_ARTISTS_FIELDS as fields } from "../../globals.js"

import {
  removeDup,
  determineSongSelect,
  determineAlbumSelect,
  deserializeCollection,
} from "../../helpers/resolvers.js"

const { Album, Song } = database.models

export default {
  albums: resolver(
    async ({ info, parent: { id } }) => {
      const filter = { artists: id }
      const sortArgs = { released: "desc" }
      const query = Album.find(filter).sort(sortArgs)
      const select = determineAlbumSelect(info)
      const collection = await query.select(select).lean().exec()
      return deserializeCollection(collection)
    },
  ),
  songs: resolver(
    async ({ info, parent: { id } }) => {
      const query = key => Song.find({ [key]: id })
      const queries = fields.map(field => query(field))
      const select = determineSongSelect(info)
      const promises = queries.map(query => query.select(select).lean().exec())
      const collection = await Promise.all(promises)
      return pipe(collection)(
        flatten,
        deserializeCollection,
        removeDup,
        orderBy("title","asc"),
      )
    },
  ),
}
