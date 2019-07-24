const { Artist, Song } = require("../models")

const { pipe } = require("../../helpers/misc")

const {
  serializeDocument,
  serializeCollection,
  orderCollection
} = require("../../helpers/collection")

const albumResolver = {
  artist: async ({ artist }) => (
    serializeDocument(await Artist.findById(artist).exec())
  ),
  songs: async ({ id }) => (
    pipe(await Song.find({ album: id }).exec())(
      serializeCollection,
      orderCollection("trackNumber", "asc")
    )
  )
}

module.exports = albumResolver
