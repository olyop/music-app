import database from "../../../database/index.js"

import {
  resolver,
  userSelect,
  deserializeDocument,
} from "../../../helpers/index.js"

const { User } = database.models

const userAddSongQueue = async ({ info, args }) => {
  const { userId, songId } = args
  
  const mutation =
    User.findByIdAndUpdate(userId, {
          $push: { queue: songId }
        })
        .setOptions({ new: true })
        .select(userSelect(info))
        .lean()
        .exec()

  return deserializeDocument(await mutation)
}

export default resolver(userAddSongQueue)
