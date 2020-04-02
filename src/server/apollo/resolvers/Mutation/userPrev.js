import database from "../../../database/index.js"
import { resolver, userQueueSelect } from "../../../helpers/misc.js"
import { deserializeDocument } from "../../../helpers/collections.js"
import { determineUserSelect, determineUserPrev } from "../../../helpers/resolvers.js"

const { User } = database.models

const userPrev = async ({ info, args }) => {
  const { id } = args

  const query =
    User.findById(id)
      .select(userQueueSelect)
      .lean()
      .exec()

  const user = deserializeDocument(await query)

  const mutation =
    User.findByIdAndUpdate(id, determineUserPrev(user))
      .setOptions({ new: true })
      .select(determineUserSelect(info, userQueueSelect))
      .lean()
      .exec()
  
  return deserializeDocument(await mutation)
}

export default resolver(userPrev)
