import database from "../../../database/index.js"
import { USER_EMPTY_QUEUE } from "../../../globals.js"

import {
  resolver,
  userSelect,
  deserializeDocument,
} from "../../../helpers/index.js"

const { Play, User } = database.models

const userPlay = async ({ info, args }) => {
  const { userId, songId } = args

  await Play.create({
    user: userId,
    song: songId,
  })

  const query =
    User.findByIdAndUpdate(userId, {
          ...USER_EMPTY_QUEUE,
          current: songId,
        })
        .setOptions({ new: true })
        .select(userSelect(info))
        .lean()
        .exec()

  return deserializeDocument(await query)
}

export default resolver(userPlay)
