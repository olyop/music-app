import database from "../../../database/index.js"
import { resolver } from "../../../helpers/misc.js"
import { determineSongSelect } from "../../../helpers/resolvers.js"
import { deserializeDocument } from "../../../helpers/collections.js"

const { UserSong, Song } = database.models

const addUserSong = async ({ args, info }) => {
  const { userId, songId } = args

  const filter = { user: userId, song: songId }
  const exists = await UserSong.exists(filter)

  if (exists) {
    await UserSong.findOneAndUpdate(filter, { inLibrary: true }).exec()
  } else {
    await UserSong.create({ ...filter, inLibrary: true })
  }

  const query =
    Song.findById(songId)
      .select(determineSongSelect(info))
      .lean()
      .exec()

  return deserializeDocument(await query)
}

export default resolver(addUserSong)
