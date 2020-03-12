import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"

import {
  restoreOrder,
  determineSongSelect,
  determineArtistSelect,
  deserializeCollection,
} from "../../helpers/resolvers.js"

const { Artist, Song } = database.models

export default {
  artists: resolver(
    async ({ info, parent: { artists } }) => await (
      Artist
        .find({ _id: artists })
        .sort({ name: "asc" })
        .select(determineArtistSelect(info))
        .lean()
        .map(deserializeCollection)
        .map(restoreOrder(artists))
        .exec()
    ),
  ),
  songs: resolver(
    async ({ info, parent: { id } }) => await (
      Song
        .find({ album: id })
        .sort({ discNumber: "asc", trackNumber: "asc" })
        .select(determineSongSelect(info))
        .lean()
        .map(deserializeCollection)
        .exec()
    ),
  ),
}
