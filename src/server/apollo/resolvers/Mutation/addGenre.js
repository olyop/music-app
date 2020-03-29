import database from "../../../database/index.js"
import { resolver } from "../../../helpers/misc.js"
import { deserializeDocument } from "../../../helpers/collections.js"

const { Genre } = database.models

const addGenre = async ({ args }) => {
  const doc = await Genre.create(args)
  return deserializeDocument(doc.toObject())
}

export default resolver(addGenre)
