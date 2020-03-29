import database from "../../../database/index.js"
import { resolver } from "../../../helpers/misc.js"
import { deserializeDocument } from "../../../helpers/collections.js"
import { determineUserSongSelect } from "../../../helpers/resolvers.js"

const { UserSong } = database.models

const removeUserSong = async ({ info, args }) => {
  const  { userId, songId } = args

  const filter = { user: userId, song: songId }

  const query =
    UserSong.findOneAndUpdate(filter, { inLibrary: false })
      .setOptions({ new: true })
      .select(determineUserSongSelect(info))
      .lean()
      .exec()

  return deserializeDocument(await query)
}

export default resolver(removeUserSong)
