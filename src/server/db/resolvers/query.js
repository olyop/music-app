const { Artist, Album, Song } = require("../models")

const { pipe } = require("../../helpers/misc")

const {
  serializeDocument,
  serializeCollection,
  orderCollection
} = require("../../helpers/collection")

const queryResolver = {
  artist: async (_parent, { id }) => (
    serializeDocument(await Artist.findById(id).exec())
  ),
  album: async (_parent, { id }) => (
    serializeDocument(await Album.findById(id).exec())
  ),
  song: async (_parent, { id }) => (
    serializeDocument(await Song.findById(id).exec())
  ),
  artists: async () => (
    pipe(await Artist.find({}).exec())(
      serializeCollection,
      orderCollection("name", "asc")
    )
  ),
  albums: async () => (
    pipe(await Album.find({}).exec())(
      serializeCollection,
      orderCollection(["year", "title"], ["desc", "asc"])
    )
  ),
  songs: async () => (
    pipe(await Song.find({}).exec())(
      serializeCollection,
      orderCollection("title", "asc")
    )
  )
}

module.exports = queryResolver
