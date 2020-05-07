import { UPDATE_USER_NEXT } from "../../../sql/index.js"

import sqlQuery from "../../../helpers/sql/sqlQuery.js"
import sqlParseRow from "../../../helpers/sql/sqlParseRow.js"

const userNext =
  async () =>
    sqlQuery({
      query: UPDATE_USER_NEXT,
      parse: sqlParseRow,
    })

// const userNext = async ({ info, args }) => {
//   const { userId } = args

//   const query =
//     User.findById(userId)
//       .select(USER_QUEUE_SELECT)
//       .lean()
//       .exec()

//   const user = deserializeDocument(await query)

//   const mutation =
//     User.findByIdAndUpdate(userId, determineUserNext(user))
//       .setOptions({ new: true })
//       .select(userSelect(info))
//       .lean()
//       .exec()

//   return deserializeDocument(await mutation)
// }

export default userNext
