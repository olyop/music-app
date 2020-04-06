import database from "../../../database/index.js"
import { resolver } from "../../../helpers/misc.js"
import { determineGenreSelect } from "../../../helpers/resolvers.js"
import { deserializeDocument } from "../../../helpers/collections.js"

const { UserGenre, Genre } = database.models

const rmUserGenre = async ({ args, info }) => {
  const { userId, genreId } = args

  const filter = { user: userId, genre: genreId }

  await UserGenre.findOneAndUpdate(filter, { inLibrary: false }).exec()

  const query =
    Genre.findById(genreId)
      .select(determineGenreSelect(info))
      .lean()
      .exec()

  return deserializeDocument(await query)
}

export default resolver(rmUserGenre)
