import { Artist, Album } from "../models.js"

import { serializeDocument } from "../../helpers/collection.js"

const songResolver = {
  artist: async ({ artist }) => await Artist.findById(artist).lean().map(serializeDocument).exec(),
  album: async ({ album }) => await Album.findById(album).lean().map(serializeDocument).exec()
}

export default songResolver
