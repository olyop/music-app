import database from "../../../database/index.js"

import {
  resolver,
  genreSelect,
  deserializeDocument,
} from "../../../helpers/index.js"

const { UserGenre, Genre } = database.models

const rmUserGenre = async ({ args, info }) => {
  const { userId, genreId } = args

  const filter = { user: userId, genre: genreId }

  await UserGenre.findOneAndUpdate(filter, { inLibrary: false }).exec()

  const query =
    Genre.findById(genreId)
         .select(genreSelect(info))
         .lean()
         .exec()

  return deserializeDocument(await query)
}

export default resolver(rmUserGenre)
