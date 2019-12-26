import { Artist, Genre, Album } from "../models/index.js"

import { resolver } from "../../helpers/misc.js"
import { serializeDocument, serializeCollection } from "../../helpers/collection.js"

export default {
  featuring: resolver(
    async ({ parent }) => {
      const query = id => Artist.findById(id).lean().exec()
      const queries = parent.featuring.map(query)
      const artists = await Promise.all(queries)
      return serializeCollection(artists)
    }
  ),
  remixers: resolver(
    async ({ parent }) => {
      const query = id => Artist.findById(id).lean().exec()
      const queries = parent.remixers.map(query)
      const artists = await Promise.all(queries)
      return serializeCollection(artists)
    }
  ),
  artists: resolver(
    async ({ parent }) => {
      const query = id => Artist.findById(id).lean().exec()
      const queries = parent.artists.map(query)
      const artists = await Promise.all(queries)
      return serializeCollection(artists)
    }
  ),
  genres: resolver(
    async ({ parent }) => {
      const query = id => Genre.findById(id).lean().exec()
      const queries = parent.genres.map(query)
      const genres = await Promise.all(queries)
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
