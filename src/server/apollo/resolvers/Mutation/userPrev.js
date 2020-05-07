import { UPDATE_USER_PREV } from "../../../sql/index.js"

import sqlQuery from "../../../helpers/sql/sqlQuery.js"
import sqlParseRow from "../../../helpers/sql/sqlParseRow.js"

const userPrev =
  async () =>
    sqlQuery({
      query: UPDATE_USER_PREV,
      parse: sqlParseRow,
    })

// const userPrev = async ({ info, args }) => {
//   const { userId } = args

//   const query =
//     User.findById(userId)
//       .select(USER_QUEUE_SELECT)
//       .lean()
//       .exec()

//   const user = deserializeDocument(await query)

//   const mutation =
//     User.findByIdAndUpdate(userId, determineUserPrev(user), { new: true })
//       .select(userSelect(info))
//       .lean()
//       .exec()

//   return deserializeDocument(await mutation)
// }

export default userPrev
