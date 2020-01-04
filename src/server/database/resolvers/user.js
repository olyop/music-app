import { Artist, Album, Genre, Song } from "../models/index.js"

import { resolver } from "../../helpers/misc.js"
import { serializeDocument, serializeCollection } from "../../helpers/collection.js"

export default {
  nowPlaying: resolver(
    async ({ parent }) => {
      const { nowPlaying } = parent
      const query = Song.findById(nowPlaying)
      const doc = await query.lean().exec()
      return serializeDocument(doc)
    }
  ),
  artists: resolver(
    async ({ parent }) => {
      const { artists } = parent
      const filter = { _id: { $in: artists } }
      const sortArgs = { name: "asc" }
      const query = Artist.find(filter).sort(sortArgs)
      const collection = await query.lean().exec()
      return serializeCollection(collection)
    }
  ),
  albums: resolver(
    async ({ parent }) => {
      const { albums } = parent
      const filter = { _id: { $in: albums } }
      const sortArgs = { released: "desc" }
      const query = Album.find(filter).sort(sortArgs)
      const collection = await query.lean().exec()
      return serializeCollection(collection)
    }
  ),
  genres: resolver(
    async ({ parent }) => {
      const { genres } = parent
      const sortArgs = { name: "asc" }
      const filter = { _id: { $in: genres } }
      const query = Genre.find(filter).sort(sortArgs)
      const collection = await query.lean().exec()
      return serializeCollection(collection)
    }
  ),
  songs: resolver(
    async ({ parent }) => {
      const { songs } = parent
      const sortArgs = { title: "asc" }
      const filter = { _id: { $in: songs } }
      const query = Song.find(filter).sort(sortArgs)
      const collection = await query.lean().exec()
      return serializeCollection(collection)
    }
  ),
}
