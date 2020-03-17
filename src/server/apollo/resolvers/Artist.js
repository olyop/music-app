import flatten from "lodash/flatten.js"
import orderBy from "lodash/fp/orderBy.js"
import database from "../../database/index.js"
import { pipe, resolver } from "../../helpers/misc.js"
import { SONG_ARTISTS_FIELDS as fields } from "../../globals.js"
import { deserializeCollection } from "../../helpers/collections.js"

import {
  removeDup,
  determineSongSelect,
  determineAlbumSelect,
} from "../../helpers/resolvers.js"

const { Album, Song } = database.models

export default {
  albums: resolver(
    async ({ info, parent: { id } }) => {
      const query =
        Album
          .find({ artists: id })
          .sort({ released: "desc" })
          .select(determineAlbumSelect(info))
          .lean()
          .exec()
      return deserializeCollection(await query)
    }
  ),
  songs: resolver(
    async ({ info, parent: { id } }) => {
      const query = field =>
        Song
          .find({ [field]: id })
          .select(determineSongSelect(info))
          .lean()
          .map(deserializeCollection)
          .exec()
      const queries = Promise.all(fields.map(query))
      return pipe(await queries)(
        flatten,
        removeDup,
        orderBy("title","asc"),
      )
    },
  ),
}
