import database from "../../../database/index.js"
import resolver from "../../../helpers/utilities/resolver.js"
import { userSelect } from "../../../helpers/mongodb/select.js"
import deserializeDocument from "../../../helpers/mongodb/deserializeDocument.js"

const { User } = database.models

const userAddSongQueue = async ({ info, args }) => {
  const { userId, songId } = args

  const mutation =
    User.findByIdAndUpdate(userId, { $push: { queue: songId } })
      .setOptions({ new: true })
      .select(userSelect(info))
      .lean()
      .exec()

  return deserializeDocument(await mutation)
}

export default resolver(userAddSongQueue)
