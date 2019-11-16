import { Artist, Album, Genre, Song } from "../models/index.js"

import { serializeCollection, serializeDocument } from "../../helpers/collection.js"

export default {
  artist: async (parent, { id }) => {
    const query = Artist.findById(id).lean()
    const result = await query.exec()
    return serializeDocument(result)
  },
  album: async (parent, { id }) => {
    const query = Album.findById(id).lean()
    const result = await query.exec()
    return serializeDocument(result)
  },
  genre: async (parent, { id }) => {
    const query = Genre.findById(id).lean().exec()
    const result = await query
    return serializeDocument(result)
  },
  song: async (parent, { id }) => {
    const query = Song.findById(id).lean().exec()
    const result = await query
    return serializeDocument(result)
  },
  artists: async () => {
    const query = Artist.find().lean().exec()
    const result = await query
    return serializeCollection(result)
  },
  albums: async () => {
    const query = Album.find().lean().exec()
    const result = await query
    return serializeCollection(result)
  },
  genres: async () => {
    const query = Genre.find().lean().exec()
    const result = await query
    return serializeCollection(result)
  },
  songs: async () => {
    const query = Song.find().lean().exec()
    const result = await query
    return serializeCollection(result)
  }
}
