import { Artist, Album, Song } from "../models.js"

import { serializeDocument, serializeCollection } from "../../helpers/collection.js"

const queryResolver = {
  artist: async (parent, { id }) => await Artist.findById(id).lean().map(serializeDocument).exec(),
  album: async (parent, { id }) => await Album.findById(id).lean().map(serializeDocument).exec(),
  song: async (parent, { id }) => await Song.findById(id).lean().map(serializeDocument).exec(),
  artists: async () => await Artist.find().lean().map(serializeCollection).exec(),
  albums: async () => await Album.find().lean().map(serializeCollection).exec(),
  songs: async () => await Song.find().lean().map(serializeCollection).exec()
}

export default queryResolver
