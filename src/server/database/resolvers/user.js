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
      const query = id => Artist.findById(id).lean().exec()
      const queries = parent.artists.map(query)
      const artists = await Promise.all(queries)
      return serializeCollection(artists)
    }
  ),
  albums: resolver(
    async ({ parent }) => {
      const query = id => Album.findById(id).lean().exec()
      const queries = parent.albums.map(query)
      const albums = await Promise.all(queries)
      return serializeCollection(albums)
    }
  ),
  genres: resolver(
    async ({ parent }) => {
      const query = id => Genre.findById(id).lean().exec()
      const queries = parent.genres.map(query)
      const result = await Promise.all(queries)
      return serializeCollection(result)
    }
  ),
  songs: resolver(
    async ({ parent }) => {
      const query = id => Song.findById(id).lean().exec()
      const queries = parent.songs.map(query)
      const songs = await Promise.all(queries)
      return serializeCollection(songs)
    }
  ),
}
