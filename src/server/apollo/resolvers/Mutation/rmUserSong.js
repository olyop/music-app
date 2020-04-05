import database from "../../../database/index.js"
import { resolver } from "../../../helpers/misc.js"
import { determineSongSelect } from "../../../helpers/resolvers.js"
import { deserializeDocument } from "../../../helpers/collections.js"

const { UserSong, Song } = database.models

const rmUserSong = async ({ args, info }) => {
  const { userId, songId } = args

  const filter = { user: userId, song: songId }

  await UserSong.findOneAndUpdate(filter, { inLibrary: false }).exec()

  const query =
    Song.findById(SongId)
      .select(determineSongSelect(info))
      .exec()
      .lean()

  return deserializeDocument(await query)
}

export default resolver(rmUserSong)
