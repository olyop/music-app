const { Artist, Album } = require("../models")

const { serializeDocument } = require("../../helpers/collection")

const songResolver = {
  artist: async ({ artist }) => (
    serializeDocument(await Artist.findById(artist).exec())
  ),
  album: async ({ album }) => (
    serializeDocument(await Album.findById(album).exec())
  )
}

module.exports = songResolver
