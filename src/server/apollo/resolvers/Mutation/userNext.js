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
  const { id } = args

  const query =
    User.findById(id)
      .select(USER_QUEUE_SELECT)
      .lean()
      .exec()

  const user = deserializeDocument(await query)

  const mutation =
    User.findByIdAndUpdate(id, determineUserNext(user))
      .setOptions({ new: true })
      .select(userSelect(info))
      .lean()
      .exec()

  return deserializeDocument(await mutation)
}

export default resolver(userNext)
