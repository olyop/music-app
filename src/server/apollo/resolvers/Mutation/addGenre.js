import {
  resolver,
  parseSqlRow,
  isGenreValid,
} from "../../../helpers/index.js"

import uuid from "uuid"
import { sql } from "../../../database/pg.js"
import { INSERT_GENRE } from "../../../sql/index.js"

const addGenre = async ({ args }) => {

  // data validation
  if (!isGenreValid(args)) {
    throw "Invalid data."
  }

  const genreId = uuid.v4()
  const { name } = args

  const genreInsert =
    sql(INSERT_GENRE, {
      genreId,
      name,
    })

  return parseSqlRow(await genreInsert)
}

export default resolver(addGenre)
