import database from "../../../database/index.js"

import {
  resolver,
  songSelect,
  determineTopTen,
  deserializeCollection,
} from "../../../helpers/index.js"

const {
  Play,
  Song,
} = database.models

const browse = async ({ args, info }) => {
  const { userId } = args

  const playsQuery =
    Play.find()
      .select({ song: 1 })
      .lean()
      .exec()

  const plays = deserializeCollection(await playsQuery)
  const topTenIds = determineTopTen(plays)

  const query =
    Song.find({ _id: topTenIds })
      .select(songSelect(info))
      .lean()
      .exec()

  const topTen = deserializeCollection(await query)

  return {
    topTen,
    newAlbums: [],
    popularArtists: [],
  }
}

export default resolver(browse)
