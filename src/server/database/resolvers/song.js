import { Artist, Genre, Album } from "../models/index.js"

import { serializeDocument, serializeCollection } from "../../helpers/collection.js"

export default {
  featuring: async ({ featuring }) => {
    const queries = featuring.map(id => Artist.findById(id).lean())
    const result = await Promise.all(queries.map(query => query.exec()))
    return serializeCollection(result)
  },
  remixers: async ({ remixers }) => {
    const queries = remixers.map(id => Artist.findById(id).lean())
    const result = await Promise.all(queries.map(query => query.exec()))
    return serializeCollection(result)
  },
  artists: async ({ artists }) => {
    const queries = artists.map(id => Artist.findById(id).lean())
    const result = await Promise.all(queries.map(query => query.exec()))
    return serializeCollection(result)
  },
  genres: async ({ genre }) => {
    const queries = genre.map(id => Genre.findById(id).lean())
    const result = await Promise.all(queries.map(query => query.exec()))
    return serializeCollection(result)
  },
  album: async ({ album }) => {
    const query = Album.findById(album).lean()
    const result = await query.exec()
    return serializeDocument(result)
  }
}
