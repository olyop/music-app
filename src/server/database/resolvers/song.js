import { Artist, Genre, Album } from "../models/index.js"

import { serializeDocument, serializeCollection } from "../../helpers/collection.js"

export default {
  featuring: async ({ featuring }) => {
    const query = id => Artist.findById(id).lean().exec()
    const queries = featuring.map(query)
    const result = await Promise.all(queries)
    return serializeCollection(result)
  },
  remixers: async ({ remixers }) => {
    const query = id => Artist.findById(id).lean().exec()
    const queries = remixers.map(query)
    const result = await Promise.all(queries)
    return serializeCollection(result)
  },
  artists: async ({ artists }) => {
    const query = id => Artist.findById(id).lean().exec()
    const queries = artists.map(query)
    const result = await Promise.all(queries)
    return serializeCollection(result)
  },
  genres: async ({ genres }) => {
    const query = id => Genre.findById(id).lean().exec()
    const queries = genres.map(query)
    const result = await Promise.all(queries)
    return serializeCollection(result)
  },
  album: async ({ album }) => {
    const query = Album.findById(album).lean().exec()
    const result = await query
    return serializeDocument(result)
  }
}
