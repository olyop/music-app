import { Artist, Label, Song } from "../models/index.js"

import { serializeDocument, serializeCollection } from "../../helpers/collection.js"

export default {
  label: async ({ label }) => {
    const query = Label.findById(label).lean()
    const result = await query.exec()
    return serializeDocument(result)
  },
  artists: async ({ artists }) => {
    const queries = artists.map(id => Artist.findById(id).lean())
    const result = await Promise.all(queries.map(query => query.exec()))
    return serializeCollection(result)
  },
  songs: async ({ id }) => {
    const query = Song.find({ album: id }).lean()
    const result = await query.exec()
    return serializeCollection(result)
  }
}
