const { Artist, Album, Song } = require("../models")

const { serializeDocument, serializeCollection } = require("../../helpers/collection")

const queryResolver = {
  artist: async (parent, { id }) => serializeDocument(await Artist.findById(id).lean().exec()),
  album: async (parent, { id }) => serializeDocument(await Album.findById(id).lean().exec()),
  song: async (parent, { id }) => serializeDocument(await Song.findById(id).lean().exec()),
  artists: async () => serializeCollection(await Artist.find().lean().exec()),
  albums: async () => serializeCollection(await Album.find().lean().exec()),
  songs: async () => serializeCollection(await Song.find().lean().exec())
}

module.exports = queryResolver
