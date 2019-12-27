import { Artist, Genre, Album } from "../models/index.js"

import { resolver } from "../../helpers/misc.js"
import { serializeDocument, serializeCollection } from "../../helpers/collection.js"

export default {
  featuring: resolver(
    async ({ parent }) => {
      const query = Artist.find({ "_id": { $in: parent.featuring } })
      const artists = await query.lean().exec()
      return serializeCollection(artists)
    }
  ),
  remixers: resolver(
    async ({ parent }) => {
      const query = Artist.find({ "_id": { $in: parent.remixers } })
      const artists = await query.lean().exec()
      return serializeCollection(artists)
    }
  ),
  artists: resolver(
    async ({ parent }) => {
      const query = Artist.find({ "_id": { $in: parent.artists } })
      const artists = await query.lean().exec()
      return serializeCollection(artists)
    }
  ),
  genres: resolver(
    async ({ parent }) => {
      const query = Genre.find({ "_id": { $in: parent.genres } })
      const genres = await query.lean().exec()
      return serializeCollection(genres)
    }
  ),
  album: resolver(
    async ({ parent }) => {
      const query = Album.findById(parent.album)
      const album = await query.lean().exec()
      return serializeDocument(album)
    }
  ),
}
