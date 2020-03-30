import database from "../../database/index.js"
import { resolver, pipe } from "../../helpers/misc.js"

import {
  restoreOrder,
  determineGenreSelect,
  determineAlbumSelect,
  determineArtistSelect,
} from "../../helpers/resolvers.js"

import {
  deserializeDocument,
  deserializeCollection,
} from "../../helpers/collections.js"

const { Artist, Genre, Album } = database.models

export default {
  featuring: resolver(
    async ({ info, parent: { featuring } }) => {
      const query =
        Artist.find({ _id: featuring })
          .select(determineArtistSelect(info))
          .lean()
          .exec()
      return pipe(await query)(
        deserializeCollection,
        restoreOrder(featuring),
      )
    },
  ),
  remixers: resolver(
    async ({ info, parent: { remixers } }) => {
      const query =
        Artist.find({ _id: remixers })
          .select(determineArtistSelect(info))
          .lean()
          .exec()
      return pipe(await query)(
        deserializeCollection,
        restoreOrder(remixers),
      )
    },
  ),
  artists: resolver(
    async ({ info, parent: { artists } }) => {
      const query =
        Artist.find({ _id: artists })
          .select(determineArtistSelect(info))
          .lean()
          .exec()
      return pipe(await query)(
        deserializeCollection,
        restoreOrder(artists),
      )
    },
  ),
  genres: resolver(
    async ({ info, parent: { genres } }) => {
      const query =
        Genre.find({ _id: genres })
          .select(determineGenreSelect(info))
          .lean()
          .exec()
      return pipe(await query)(
        deserializeCollection,
        restoreOrder(genres),
      )
    },
  ),
  album: resolver(
    async ({ info, parent: { album } }) => {
      const query =
        Album.findById(album)
          .select(determineAlbumSelect(info))
          .lean()
          .exec()
      return deserializeDocument(await query)
    },
  ),
}
