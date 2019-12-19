import { Artist, Album, Genre, Song } from "../models/index.js"

import { serializeDocument, serializeCollection } from "../../helpers/collection.js"

export default {
  nowPlaying: async ({ nowPlaying }) => {
    const query = Song.findById(nowPlaying).lean().exec()
    const result = await query
    return serializeDocument(result)
  },
  artists: async ({ artists }) => {
    const query = id => Artist.findById(id).lean().exec()
    const queries = artists.map(query)
    const result = await Promise.all(queries)
    return serializeCollection(result)
  },
  albums: async ({ albums }) => {
    const query = id => Album.findById(id).lean().exec()
    const queries = albums.map(query)
    const result = await Promise.all(queries)
    return serializeCollection(result)
  },
  genres: async ({ genres }) => {
    const query = id => Genre.findById(id).lean().exec()
    const queries = genres.map(query)
    const result = await Promise.all(queries)
    return serializeCollection(result)
  },
  songs: async ({ songs }) => {
    const query = id => Song.findById(id).lean().exec()
    const queries = songs.map(query)
    const result = await Promise.all(queries)
    return serializeCollection(result)
  },
}
