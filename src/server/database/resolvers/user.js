import { Artist, Album, Genre, Song } from "../models/index.js"

import { resolver } from "../../helpers/misc.js"
import { serializeDocument, serializeCollection } from "../../helpers/collection.js"

export default {
  nowPlaying: resolver(
    async ({ parent }) => {
      const query = Song.findById(parent.nowPlaying)
      const song = await query.lean().exec()
      return serializeDocument(song)
    }
  ),
  artists: resolver(
    async ({ parent }) => {
      const query = Artist.find({ "_id": { $in: parent.artists } })
      const artists = await query.lean().exec()
      return serializeCollection(artists)
    }
  ),
  albums: resolver(
    async ({ parent }) => {
      const query = Album.find({ "_id": { $in: parent.albums } })
      const albums = await query.lean().exec()
      return serializeCollection(albums)
    }
  ),
  genres: resolver(
    async ({ parent }) => {
      const query = Genre.find({ "_id": { $in: parent.genres } })
      const genres = await query.lean().exec()
      return serializeCollection(genres)
    }
  ),
  songs: resolver(
    async ({ parent }) => {
      const query = Song.find({ "_id": { $in: parent.songs } })
      const songs = await query.lean().exec()
      return serializeCollection(songs)
    }
  ),
}
