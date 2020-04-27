import database from "../../../database/index.js"
import { USER_QUEUE_SELECT } from "../../../globals/miscellaneous.js"

import resolver from "../../../helpers/utilities/resolver.js"
import { userSelect } from "../../../helpers/mongodb/select.js"
import determineUserNext from "../../../helpers/resolver/determineUserNext.js"
import deserializeDocument from "../../../helpers/mongodb/deserializeDocument.js"

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
