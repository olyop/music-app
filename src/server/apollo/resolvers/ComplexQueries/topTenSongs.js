import {
  pipe,
  resolver,
  songSelect,
  restoreOrder,
  deserializeCollection,
} from "../../../helpers/index.js"

import map from "lodash/fp/map.js"
import database from "../../../database/index.js"

const { Play, Song } = database.models

const topTenSongs = async ({ info }) => {
  const playQuery =
    Play.aggregate()
        .group({ _id: "$song", plays: { $sum: 1 } })
        .sort({ plays: "desc" })
        .limit(10)
        .exec()

  const topTenIds = pipe(await playQuery)(
    deserializeCollection,
    map(({ id }) => id),
  )

  const songsQuery =
    Song.find({ _id: topTenIds })
        .select(songSelect(info))
        .lean()
        .exec()

  const topTenSongs = pipe(await songsQuery)(
    deserializeCollection,
    restoreOrder(topTenIds),
  )

  return topTenSongs
}

export default resolver(topTenSongs)
