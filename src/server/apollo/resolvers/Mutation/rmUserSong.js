import database from "../../../database/index.js"
import { songSelect } from "../../../helpers/mongodb/select.js"
import deserializeDocument from "../../../helpers/mongodb/deserializeDocument.js"

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

export default rmUserSong
