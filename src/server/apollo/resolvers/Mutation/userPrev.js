import database from "../../../database/index.js"
import { determineUserSelect } from "../../../helpers/resolvers.js"
import { resolver, userQueueSelect } from "../../../helpers/misc.js"
import { deserializeDocument } from "../../../helpers/collections.js"

const { User } = database.models

const userPrev = async ({ args }) => {
  const { userId } = args

  const query =
    User.findById(userId)
      .select(userQueueSelect)
      .lean()
      .exec()

  const user = deserializeDocument(await query)

  const mutation =
    User.findByIdAndUpdate(userId, determineUserPrevUpdate(user))
      .setOptions({ new: true })
      .select(determineUserSelect(info, userQueueSelect))
      .lean()
      .exec()
  
  return deserializeDocument(await mutation)
}

export default resolver(userPrev)
