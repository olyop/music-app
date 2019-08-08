import { Artist, Album, Song } from "../models.js"

import { serializeDocument } from "../../helpers/collection.js"

const mutationResolver = {
  addArtist: async (parent, doc) => serializeDocument((await Artist.create(doc)).toObject()),
  addAlbum: async (parent, doc) => serializeDocument((await Album.create(doc)).toObject()),
  addSong: async (parent, doc) => serializeDocument((await Song.create(doc)).toObject())
}

export default mutationResolver
