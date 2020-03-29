import database from "../../database/index.js"
import { resolver, pipe, dataUrl } from "../../helpers/misc.js"
import { deserializeCollection } from "../../helpers/collections.js"

import {
  restoreOrder,
  determineSongSelect,
  determineArtistSelect,
} from "../../helpers/resolvers.js"

const { Artist, Song } = database.models

export default {
  cover: resolver(
    async ({ parent: { cover } }) => dataUrl(cover),
  ),
  artists: resolver(
    async ({ info, parent: { artists } }) => {
      const query =
        Artist.find({ _id: artists })
          .sort({ name: "asc" })
          .select(determineArtistSelect(info))
          .lean()
          .exec()
      return pipe(await query)(
        deserializeCollection,
        restoreOrder(artists),
      ) 
    },
  ),
  songs: resolver(
    async ({ info, parent: { id } }) => {
      const query =
        Song.find({ album: id })
          .sort({ discNumber: "asc", trackNumber: "asc" })
          .select(determineSongSelect(info))
          .lean()
          .exec()
      return deserializeCollection(await query)
    },
  ),
}
