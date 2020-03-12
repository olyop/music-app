import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"

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
    async ({ info, parent: { featuring } }) => await (
      Artist
        .find({ _id: featuring })
        .select(determineArtistSelect(info))
        .lean()
        .map(deserializeCollection)
        .map(restoreOrder(featuring))
        .exec()
    ),
  ),
  remixers: resolver(
    async ({ info, parent: { remixers } }) => await (
      Artist
        .find({ _id: remixers })
        .select(determineArtistSelect(info))
        .lean()
        .map(deserializeCollection)
        .map(restoreOrder(remixers))
        .exec()
    ),
  ),
  artists: resolver(
    async ({ info, parent: { artists } }) => await (
      Artist
        .find({ _id: artists })
        .select(determineArtistSelect(info))
        .lean()
        .map(deserializeCollection)
        .map(restoreOrder(artists))
        .exec()
    ),
  ),
  genres: resolver(
    async ({ info, parent: { genres } }) => await (
      Genre
        .find({ _id: genres })
        .select(determineGenreSelect(info))
        .lean()
        .map(deserializeCollection)
        .map(restoreOrder(genres))
        .exec()
    ),
  ),
  album: resolver(
    async ({ info, parent: { album } }) => await (
      Album
        .findById(album)
        .select(determineAlbumSelect(info))
        .lean()
        .map(deserializeDocument)
        .exec()
    )
  ),
}
