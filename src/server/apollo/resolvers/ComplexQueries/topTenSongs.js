import map from "lodash/fp/map.js"
import database from "../../../database/index.js"
import pipe from "../../../helpers/utilities/pipe.js"
import resolver from "../../../helpers/utilities/resolver.js"
import { songSelect } from "../../../helpers/mongodb/select.js"
import restoreOrder from "../../../helpers/mongodb/restoreOrder.js"
import deserializeCollection from "../../../helpers/mongodb/deserializeCollection.js"

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

  const songs = pipe(await songsQuery)(
    deserializeCollection,
    restoreOrder(topTenIds),
  )

  return songs
}

export default resolver(topTenSongs)
