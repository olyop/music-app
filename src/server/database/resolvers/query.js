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
    const query = Genre.findById(id).lean()
    const result = await query.exec()
    return serializeDocument(result)
  },
  song: async (parent, { id }) => {
    const query = Song.findById(id).lean()
    const result = await query.exec()
    return serializeDocument(result)
  },
  artists: async () => {
    const query = Artist.find().lean()
    const result = await query.exec()
    return serializeCollection(result)
  },
  albums: async () => {
    const query = Album.find().lean()
    const result = await query.exec()
    return serializeCollection(result)
  },
  genres: async () => {
    const query = Genre.find().lean()
    const result = await query.exec()
    return serializeCollection(result)
  },
  songs: async () => {
    const query = Song.find().lean()
    const result = await query.exec()
    return serializeCollection(result)
  }
}
