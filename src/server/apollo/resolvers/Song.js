import database from "../../database/index.js"
import { pipe, resolver } from "../../helpers/misc.js"

import {
  restoreOrder,
  deserializeDocument,
  determineGenreSelect,
  determineAlbumSelect,
  determineArtistSelect,
  deserializeCollection,
} from "../../helpers/resolvers.js"

const { Artist, Genre, Album } = database.models

export default {
  featuring: resolver(
    async ({ info, parent: { featuring } }) => {
      const filter = { _id: featuring }
      const query = Artist.find(filter)
      const select = determineArtistSelect(info)
      const collection = await query.select(select).lean().exec()
      return pipe(collection)(
        deserializeCollection,
        restoreOrder(featuring),
      )
    }
  ),
  remixers: resolver(
    async ({ info, parent: { remixers } }) => {
      const filter = { _id: remixers }
      const query = Artist.find(filter)
      const select = determineArtistSelect(info)
      const collection = await query.select(select).lean().exec()
      return pipe(collection)(
        deserializeCollection,
        restoreOrder(remixers),
      )
    }
  ),
  artists: resolver(
    async ({ info, parent: { artists } }) => {
      const filter = { _id: artists }
      const query = Artist.find(filter)
      const select = determineArtistSelect(info)
      const collection = await query.select(select).lean().exec()
      return pipe(collection)(
        deserializeCollection,
        restoreOrder(artists),
      )
    }
  ),
  genres: resolver(
    async ({ info, parent: { genres } }) => {
      const filter = { _id: genres }
      const query = Genre.find(filter)
      const select = determineGenreSelect(info)
      const collection = await query.select(select).lean().exec()
      return pipe(collection)(
        deserializeCollection,
        restoreOrder(genres),
      )
    }
  ),
  album: resolver(
    async ({ info, parent: { album } }) => {
      const query = Album.findById(album)
      const select = determineAlbumSelect(info)
      const doc = await query.select(select).lean().exec()
      return deserializeDocument(doc)
    }
  ),
}
