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
      const query = Artist.find(filter)
      const collection = await query.lean().exec()
      return serializeCollection(collection)
    }
  ),
  albums: resolver(
    async ({ parent }) => {
      const { albums } = parent
      const filter = { _id: { $in: albums } }
      const query = Album.find(filter)
      const collection = await query.lean().exec()
      return serializeCollection(collection)
    }
  ),
  genres: resolver(
    async ({ parent }) => {
      const { genres } = parent
      const filter = { _id: { $in: genres } }
      const query = Genre.find(filter)
      const collection = await query.lean().exec()
      return serializeCollection(collection)
    }
  ),
  songs: resolver(
    async ({ parent }) => {
      const { songs } = parent
      const filter = { _id: { $in: songs } }
      const query = Song.find(filter)
      const collection = await query.lean().exec()
      return serializeCollection(collection)
    }
  ),
}
