import database from "../../../database/index.js"
import { userSelect } from "../../../helpers/mongodb/select.js"
import determineUserPrev from "../../../helpers/resolver/determineUserPrev.js"
import deserializeDocument from "../../../helpers/mongodb/deserializeDocument.js"

import { USER_QUEUE_SELECT } from "../../../globals/miscellaneous.js"

const { User } = database.models

const userPrev = async ({ info, args }) => {
  const { userId } = args

  const query =
    User.findById(userId)
      .select(USER_QUEUE_SELECT)
      .lean()
      .exec()

  const user = deserializeDocument(await query)

  const mutation =
    User.findByIdAndUpdate(userId, determineUserPrev(user), { new: true })
      .select(userSelect(info))
      .lean()
      .exec()

  return deserializeDocument(await mutation)
}

export default userPrev
