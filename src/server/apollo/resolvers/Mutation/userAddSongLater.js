import database from "../../../database/index.js"
import { userSelect } from "../../../helpers/mongodb/select.js"
import deserializeDocument from "../../../helpers/mongodb/deserializeDocument.js"

const { User } = database.models

const userAddSongLater = async ({ info, args }) => {
  const { userId, songId } = args

  const mutation =
    User.findByIdAndUpdate(userId, { $push: { next: songId } })
      .setOptions({ new: true })
      .select(userSelect(info))
      .lean()
      .exec()

  return deserializeDocument(await mutation)
}

export default userAddSongLater
