import { Artist, Label, Album, Genre, Song } from "../models/index.js"

import { serializeCollection } from "../../helpers/collection.js"

export default {
  artists: async () => {
    const query = await Artist.find().lean()
    const result = await query.exec()
    return serializeCollection(result)
  },
  labels: async () => {
    const query = await Label.find().lean()
    const result = await query.exec()
    return serializeCollection(result)
  },
  albums: async () => {
    const query = await Album.find().lean()
    const result = await query.exec()
    return serializeCollection(result)
  },
  genres: async () => {
    const query = await Genre.find().lean()
    const result = await query.exec()
    return serializeCollection(result)
  },
  songs: async () => {
    const query = await Song.find().lean()
    const result = await query.exec()
    return serializeCollection(result)
  }
}
