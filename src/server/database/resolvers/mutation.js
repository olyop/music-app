import { Artist, Label, Album, Genre, Song } from "../models/index.js"

import { serializeDocument } from "../../helpers/collection.js"

export default {
  addArtist: async (parent, doc) => {
    const result = await Artist.create(doc)
    return serializeDocument(result.toObject())
  },
  addLabel: async (parent, doc) => {
    const result = await Label.create(doc)
    return serializeDocument(result.toObject())
  },
  addAlbum: async (parent, doc) => {
    const result = await Album.create(doc)
    return serializeDocument(result.toObject())
  },
  addGenre: async (parent, doc) => {
    const result = await Genre.create(doc)
    return serializeDocument(result.toObject())
  },
  addSong: async (parent, doc) => {
    const result = await Song.create(doc)
    return serializeDocument(result.toObject())
  }
}
