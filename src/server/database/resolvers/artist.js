const { Album, Song } = require("../models")

const { serializeCollection } = require("../../helpers/collection")

const artistResolver = {
  albums: async ({ id }) => serializeCollection(await Album.find({ artist: id }).lean().exec()),
  songs: async ({ id }) => serializeCollection(await Song.find({ artist: id }).lean().exec())
}

module.exports = artistResolver
