import { UPDATE_USER_PLAY } from "../../../sql/index.js"

import sqlQuery from "../../../helpers/sql/sqlQuery.js"
import sqlParseRow from "../../../helpers/sql/sqlParseRow.js"

const userPlay =
  async () =>
    sqlQuery({
      query: UPDATE_USER_PLAY,
      parse: sqlParseRow,
    })

// const userPlay = async ({ info, args }) => {
//   const { userId, songId } = args

//   await Play.create({
//     user: userId,
//     song: songId,
//   })

//   const query =
//     User.findByIdAndUpdate(userId, { ...USER_EMPTY_QUEUE, current: songId })
//       .setOptions({ new: true })
//       .select(userSelect(info))
//       .lean()
//       .exec()

//   return deserializeDocument(await query)
// }

export default userPlay
