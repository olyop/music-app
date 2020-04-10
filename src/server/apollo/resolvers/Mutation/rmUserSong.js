import database from "../../../database/index.js"

import {
  resolver,
  songSelect,
  deserializeDocument,
} from "../../../helpers/index.js"

const { UserSong, Song } = database.models

const rmUserSong = async ({ args, info }) => {
  const { userId, songId } = args

  const filter = { user: userId, song: songId }

  await UserSong.findOneAndUpdate(filter, { inLibrary: false }).exec()

  const query =
    Song.findById(songId)
        .select(songSelect(info))
        .lean()
        .exec()

  return deserializeDocument(await query)
}

export default resolver(rmUserSong)
