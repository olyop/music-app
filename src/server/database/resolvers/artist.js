import { Album, Song } from "../models.js"

import { serializeCollection } from "../../helpers/collection.js"

const artistResolver = {
  albums: async ({ id }) => await Album.find({ artist: id }).map(serializeCollection).lean().exec(),
  songs: async ({ id }) => await Song.find({ artist: id }).map(serializeCollection).lean().exec()
}
export default artistResolver
