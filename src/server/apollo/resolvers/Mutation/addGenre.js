import database from "../../../database/index.js"

import {
  resolver,
  deserializeDocument,
} from "../../../helpers/index.js"

const { Genre } = database.models

const addGenre = async ({ args }) => {
  const doc = await Genre.create(args)
  return deserializeDocument(doc.toObject())
}

export default resolver(addGenre)
