import { Artist, Song } from "../models.js"

import { serializeDocument, serializeCollection } from "../../helpers/collection.js"

const albumResolver = {
  artist: async ({ artist }) => await Artist.findById(artist).lean().map(serializeDocument).exec(),
  songs: async ({ id }) => await Song.find({ album: id }).lean().map(serializeCollection).exec()
}

export default albumResolver
