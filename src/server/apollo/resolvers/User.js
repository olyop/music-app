import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"
import { serializeDocument, serializeCollection } from "../../helpers/collection.js"

const { Play, Song, UserSong, UserAlbum, Playlist } = database.models

export default {
  nowPlaying: resolver(
    async ({ parent }) => {
      const { nowPlaying } = parent
      const query = Song.findById(nowPlaying)
      const doc = await query.lean().exec()
      return serializeDocument(doc)
    }
  ),
  prev: resolver(
    async ({ parent }) => {
      const { prev } = parent
      const filter = { _id: { $in: prev } }
      const query = Song.find(filter)
      const collection = await query.lean().exec()
      return serializeCollection(collection)
    }
  ),
  next: resolver(
    async ({ parent }) => {
      const { next } = parent
      const filter = { _id: { $in: next } }
      const query = Song.find(filter)
      const collection = await query.lean().exec()
      return serializeCollection(collection)
    }
  ),
  queue: resolver(
    async ({ parent }) => {
      const { queue } = parent
      const filter = { _id: { $in: queue } }
      const query = Song.find(filter)
      const collection = await query.lean().exec()
      return serializeCollection(collection)
    }
  ),
  playlists: resolver(
    async ({ parent }) => {
      const { playlists } = parent
      const filter = { _id: { $in: playlists } }
      const query = Playlist.find(filter)
      const collection = await query.lean().exec()
      return serializeCollection(collection)
    },
  ),
  plays: resolver(
    async ({ parent }) => {
      const { id: user } = parent
      const filter = { user }
      const query = Play.find(filter)
      const collection = await query.lean().exec()
      return serializeCollection(collection)
    }
  ),
  songs: resolver(
    async ({ parent }) => {
      const { id: user } = parent
      const filter = { inLibrary: true, user }
      const query = UserSong.find(filter)
      const collection = await query.lean().exec()
      return serializeCollection(collection)
    }
  ),
  albums: resolver(
    async ({ parent }) => {
      const { id: user } = parent
      const filter = { inLibrary: true, user }
      const query = UserAlbum.find(filter)
      const collection = await query.lean().exec()
      return serializeCollection(collection)
    }
  ),
}
