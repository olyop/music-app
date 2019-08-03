const { Artist, Album, Song } = require("../models")

const { serializeDocument } = require("../../helpers/collection")

const mutationResolver = {
  addArtist: async (parent, { cover, ...doc }) => {
    console.log(cover)
    return serializeDocument((await Artist.create({ ...doc })).toObject())
  },
  addAlbum: async (parent, { cover, ...doc }) => {
    return serializeDocument((await Album.create({ ...doc })).toObject())
  },
  addSong: async (parent, { audio, ...doc }) => {
    return serializeDocument((await Song.create({ ...doc })).toObject())
  }
}

module.exports = mutationResolver
