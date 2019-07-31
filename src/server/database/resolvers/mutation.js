const { Artist, Album, Song } = require("../models")

const { serializeDocument } = require("../../helpers/collection")

const mutationResolver = {
  addArtist: async (parent, args) => serializeDocument((await Artist.create({ ...args })).toObject()),
  addAlbum: async (parent, args) => serializeDocument((await Album.create({ ...args })).toObject()),
  addSong: async (parent, args) => serializeDocument((await Song.create({ ...args })).toObject())
}

module.exports = mutationResolver
