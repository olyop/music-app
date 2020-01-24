import { Artist, Genre, Album } from "../models/index.js"

import {
  pipe,
  resolver,
} from "../../helpers/misc.js"

import {
  restoreOrder,
  serializeDocument,
  serializeCollection,
} from "../../helpers/collection.js"

export default {
  featuring: resolver(
    async ({ parent }) => {
      const { featuring } = parent
      const filter = { _id: { $in: featuring } }
      const query = Artist.find(filter)
      const collection = await query.lean().exec()
      return pipe(collection)(
        serializeCollection,
        restoreOrder(featuring)
      )
    }
  ),
  remixers: resolver(
    async ({ parent }) => {
      const { remixers } = parent
      const filter = { _id: { $in: remixers } }
      const query = Artist.find(filter)
      const collection = await query.lean().exec()
      return pipe(collection)(
        serializeCollection,
        restoreOrder(remixers)
      )
    }
  ),
  artists: resolver(
    async ({ parent }) => {
      const { artists } = parent
      const filter = { _id: { $in: artists } }
      const query = Artist.find(filter)
      const collection = await query.lean().exec()
      return pipe(collection)(
        serializeCollection,
        restoreOrder(artists)
      )
    }
  ),
  genres: resolver(
    async ({ parent }) => {
      const { genres } = parent
      const filter = { _id: { $in: genres } }
      const query = Genre.find(filter)
      const collection = await query.lean().exec()
      return pipe(collection)(
        serializeCollection,
        restoreOrder(genres)
      )
    }
  ),
  album: resolver(
    async ({ parent }) => {
      const { album } = parent
      const query = Album.findById(album)
      const doc = await query.lean().exec()
      return serializeDocument(doc)
    }
  ),
}
