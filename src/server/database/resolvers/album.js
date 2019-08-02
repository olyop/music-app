const { Artist, Song } = require("../models")

const { serializeDocument, serializeCollection } = require("../../helpers/collection")

const albumResolver = {
  artist: async ({ artist }) => await Artist.findById(artist).lean().map(serializeDocument).exec(),
  songs: async ({ id }) => await Song.find({ album: id }).lean().map(serializeCollection).exec()
}

module.exports = albumResolver
