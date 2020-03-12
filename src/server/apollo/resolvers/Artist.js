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
    async ({ info, parent: { id } }) => await (
      Album
        .find({ artists: id })
        .sort({ released: "desc" })
        .select(determineAlbumSelect(info))
        .lean()
        .map(deserializeCollection)
        .exec()
    ),
  ),
  songs: resolver(
    async ({ info, parent: { id } }) => {
      const queries = fields.map(
        field => (
          Song
            .find({ [field]: id })
            .select(determineSongSelect(info))
            .lean()
            .map(deserializeCollection)
            .exec()
        )
      )
      const collections = await Promise.all(queries)
      return pipe(collections)(
        flatten,
        removeDup,
        orderBy("title","asc"),
      )
    },
  ),
}
