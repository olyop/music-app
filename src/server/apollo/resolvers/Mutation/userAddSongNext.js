import database from "../../../database/index.js"
import resolver from "../../../helpers/utilities/resolver.js"
import { userSelect } from "../../../helpers/mongodb/select.js"
import deserializeDocument from "../../../helpers/mongodb/deserializeDocument.js"

const { User } = database.models

const userAddSongNext = async ({ info, args }) => {
  const { userId, songId } = args
  
  const mutation =
    User.findByIdAndUpdate(userId,{ $push: { next: { $each: [songId], $position: 0 } }})
      .setOptions({ new: true })
      .select(userSelect(info))
      .lean()
      .exec()

  return deserializeDocument(await mutation)
}

export default resolver(userAddSongNext)
