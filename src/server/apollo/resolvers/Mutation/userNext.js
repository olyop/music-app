import database from "../../../database/index.js"
import { USER_QUEUE_SELECT } from "../../../globals.js"

import {
  resolver,
  userSelect,
  determineUserNext,
  deserializeDocument,
} from "../../../helpers/index.js"

const { User } = database.models

const userNext = async ({ info, args }) => {
  const { userId } = args

  const query =
    User.findById(userId)
        .select(USER_QUEUE_SELECT)
        .lean()
        .exec()

  const user = deserializeDocument(await query)

  const mutation =
    User.findByIdAndUpdate(userId, determineUserNext(user))
        .setOptions({ new: true })
        .select(userSelect(info))
        .lean()
        .exec()
  
  return deserializeDocument(await mutation)
}

export default resolver(userNext)
