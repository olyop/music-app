import {
  isGenre,
  resolver,
  parseSqlRow,
  queryDatabase,
  isColumnUnique,
} from "../../../helpers/index.js"

import ApolloServerExpress from "apollo-server-express"

import uuid from "uuid"
import { INSERT_GENRE } from "../../../sql/index.js"

const { UserInputError } = ApolloServerExpress

const addGenre = async ({ args }) => {

  if (!isGenre(args)) {
    throw new UserInputError("Invalid arguments.")
  }

  const { name } = args

  const isNameUnique = await isColumnUnique("name", name, "genres")

  if (!isNameUnique) {
    throw new UserInputError("Database checks failed.")
  }

  const genreId = uuid.v4()

  const genreInsert =
    queryDatabase({
      query: INSERT_GENRE,
      parse: parseSqlRow,
      variables: {
        genreId,
        name,
      },
    })

  const genre = await genreInsert

  return genre
}

export default resolver(addGenre)
