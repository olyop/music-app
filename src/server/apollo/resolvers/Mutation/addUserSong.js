import database from "../../../database/index.js"
import { resolver } from "../../../helpers/misc.js"
import { deserializeDocument } from "../../../helpers/collections.js"
import { determineUserSongSelect } from "../../../helpers/resolvers.js"

const { UserSong } = database.models

const addUserSong = async ({ info, args }) => {
  const { userId, songId } = args

  const filter = { user: userId, song: songId }
  const exists = await UserSong.exists(filter)

  if (exists) {
    const query =
      UserSong.findOneAndUpdate(filter, { inLibrary: true })
        .setOptions({ new: true })
        .select(determineUserSongSelect(info))
        .lean()
        .exec()
    return deserializeDocument(await query)
  } else {
    const doc = await UserSong.create({ ...filter, inLibrary: true })
    return deserializeDocument(doc.toObject())
  }
}

export default resolver(addUserSong)
