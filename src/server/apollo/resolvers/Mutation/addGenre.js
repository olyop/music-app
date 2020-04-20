import {
  isGenre,
  resolver,
  parseSqlRow,
} from "../../../helpers/index.js"

import ApolloServerExpress from "apollo-server-express"

import uuid from "uuid"
import { sql } from "../../../database/pg.js"
import { WHERE_GENRE, INSERT_GENRE } from "../../../sql/index.js"

const { UserInputError } = ApolloServerExpress

const addGenre = async ({ args }) => {

  // data validation
  if (!isGenre(args)) {
    throw new UserInputError("Invalid arguments.")
  }

  // check name is unique
  if (!(await sqlIsUnique({
    query: WHERE_GENRE,
    val: args.name,
    col: "name",
  }))) {
    throw "Name already in use."
  }

  const genreId = uuid.v4()
  const { name } = args

  const genreInsert =
    sql({
      query: INSERT_GENRE,
      parse: parseSqlRow,
      args: {
        genreId,
        name,
      },
    })

  const genre = await genreInsert
  
  return genre
}

export default resolver(addGenre)
