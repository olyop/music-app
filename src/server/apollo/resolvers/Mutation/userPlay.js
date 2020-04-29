import database from "../../../database/index.js"
import { USER_EMPTY_QUEUE } from "../../../globals/miscellaneous.js"

import { userSelect } from "../../../helpers/mongodb/select.js"
import deserializeDocument from "../../../helpers/mongodb/deserializeDocument.js"

const { Play, User } = database.models

const userPlay = async ({ info, args }) => {
  const { userId, songId } = args

  await Play.create({
    user: userId,
    song: songId,
  })

  const query =
    User.findByIdAndUpdate(userId, { ...USER_EMPTY_QUEUE, current: songId })
      .setOptions({ new: true })
      .select(userSelect(info))
      .lean()
      .exec()

  return deserializeDocument(await query)
}

export default userPlay
