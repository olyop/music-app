import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"

import {
  determineSongSelect,
  deserializeCollection,
} from "../../helpers/resolvers.js"

const { Song } = database.models

export default {
  songs: resolver(
    async ({ info, parent: { songs } }) => await (
      Song
        .find({ _id: songs })
        .sort({ name: "asc" })
        .select(determineSongSelect(info))
        .lean()
        .map(deserializeCollection)
        .exec()
    ),
  ),
}
