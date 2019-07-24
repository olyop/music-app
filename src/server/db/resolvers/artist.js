const { Album, Song } = require("../models")

const { serializeCollection, orderCollection } = require("../../helpers/collection")
const { pipe } = require("../../helpers/misc")

const artistResolver = {
  albums: async ({ id }) => (
    pipe(await Album.find({ artist: id }).exec())(
      serializeCollection,
      orderCollection("year", "desc")
    )
  ),
  songs: async ({ id }) => (
    pipe(await Song.find({ artist: id }).exec())(
      serializeCollection,
      orderCollection("title", "asc")
    )
  )
}

module.exports = artistResolver
