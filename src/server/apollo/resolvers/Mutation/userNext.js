import database from "../../../database/index.js"
import { resolver, userQueueSelect } from "../../../helpers/misc.js"
import { deserializeDocument } from "../../../helpers/collections.js"
import { determineUserSelect, determineUserNext } from "../../../helpers/resolvers.js"

const { User } = database.models

const userNext = async ({ args }) => {
  const { id } = args

  const query =
    User.findById(id)
      .select(userQueueSelect)
      .lean()
      .exec()

  const user = deserializeDocument(await query)

  const mutation =
    User.findByIdAndUpdate(userId, determineUserNext(user))
      .setOptions({ new: true })
      .select(determineUserSelect(info, userQueueSelect))
      .lean()
      .exec()

  return deserializeDocument(await mutation)
}

export default resolver(userNext)
