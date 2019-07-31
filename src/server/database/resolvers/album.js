const { Artist, Song } = require("../models")

const { serializeDocument, serializeCollection } = require("../../helpers/collection")

const albumResolver = {
  artist: async ({ artist }) => serializeDocument(await Artist.findById(artist).lean().exec()),
  songs: async ({ id }) => serializeCollection(await Song.find({ album: id }).lean().exec())
}

module.exports = albumResolver
