import database from "../../../database/index.js"

import {
  resolver,
  genreSelect,
  deserializeDocument,
} from "../../../helpers/index.js"

const { UserGenre, Genre } = database.models

const addUserGenre = async ({ args, info }) => {
  const { userId, genreId } = args

  const filter = { user: userId, genre: genreId }
  const exists = await UserGenre.exists(filter)

  if (exists) {
    await UserGenre.findOneAndUpdate(filter, { inLibrary: true }).exec()
  } else {
    await UserGenre.create({ ...filter, inLibrary: true })
  }

  const query =
    Genre.findById(genreId)
         .select(genreSelect(info))
         .lean()
         .exec()

  return deserializeDocument(await query)
}

export default resolver(addUserGenre)