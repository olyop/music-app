import database from "../../../database/index.js"
import { resolver } from "../../../helpers/misc.js"
import { determineUserSelect } from "../../../helpers/resolvers.js"
import { deserializeDocument } from "../../../helpers/collections.js"

const { User } = database.models

const userAddSongLater = async ({ info, args }) => {
  const { userId, songId } = args
  
  const mutation =
    User.findByIdAndUpdate(
        userId,
        { $push: { next: songId } },
      )
      .setOptions({ new: true })
      .select(determineUserSelect(info))
      .lean()
      .exec()

  return deserializeDocument(await mutation)
}

export default resolver(userAddSongLater)
