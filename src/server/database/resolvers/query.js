import { Artist, Album, Genre, Song } from "../models/index.js"

import { serializeCollection } from "../../helpers/collection.js"

export default {
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
