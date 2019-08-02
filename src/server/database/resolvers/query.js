const { Artist, Album, Song } = require("../models")

const { serializeDocument, serializeCollection } = require("../../helpers/collection")

const queryResolver = {
  artist: async (p, { id }) => await Artist.findById(id).lean().map(serializeDocument).exec(),
  album: async (p, { id }) => await Album.findById(id).lean().map(serializeDocument).exec(),
  song: async (p, { id }) => await Song.findById(id).lean().map(serializeDocument).exec(),
  artists: async () => await Artist.find().lean().map(serializeCollection).exec(),
  albums: async () => await Album.find().lean().map(serializeCollection).exec(),
  songs: async () => await Song.find().lean().map(serializeCollection).exec()
}

module.exports = queryResolver
