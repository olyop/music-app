const { Artist, Album } = require("../models")

const { serializeDocument } = require("../../helpers/collection")

const songResolver = {
  artist: async ({ artist }) => await Artist.findById(artist).lean().map(serializeDocument).exec(),
  album: async ({ album }) => await Album.findById(album).lean().map(serializeDocument).exec()
}

module.exports = songResolver
