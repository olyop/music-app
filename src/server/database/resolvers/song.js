const { Artist, Album } = require("../models")

const { serializeDocument } = require("../../helpers/collection")

const songResolver = {
  artist: async ({ artist }) => serializeDocument(await Artist.findById(artist).lean().exec()),
  album: async ({ album }) => serializeDocument(await Album.findById(album).lean().exec())
}

module.exports = songResolver
