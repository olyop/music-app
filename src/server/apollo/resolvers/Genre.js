import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"

import {
  determineSongSelect,
  deserializeCollection,
} from "../../helpers/resolvers.js"

const { Song } = database.models

export default {
  songs: resolver(
    async ({ info, parent: { id } }) => await (
      Song
        .find({ genres: id })
        .sort({ title: "asc" })
        .select(determineSongSelect(info))
        .lean()
        .map(deserializeCollection)
        .exec()
    )
  )
}
