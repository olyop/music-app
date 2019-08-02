const { Album, Song } = require("../models")

const { serializeCollection } = require("../../helpers/collection")

const artistResolver = {
  albums: async ({ id }) => await Album.find({ artist: id }).map(serializeCollection).lean().exec(),
  songs: async ({ id }) => await Song.find({ artist: id }).map(serializeCollection).lean().exec()
}

module.exports = artistResolver
