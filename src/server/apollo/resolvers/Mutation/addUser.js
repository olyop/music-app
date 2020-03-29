import database from "../../../database/index.js"
import { resolver } from "../../../helpers/misc.js"
import { USER_EMPTY_QUEUE } from "../../../globals.js"
import { deserializeDocument } from "../../../helpers/collections.js"

const { User } = database.models

const addUser = async ({ args }) => {
  const { name } = args

  const doc = await User.create({
    name,
    playlists: [],
    ...USER_EMPTY_QUEUE,
  })

  console.log(deserializeDocument(doc.toObject()))

  return deserializeDocument(doc.toObject())
}

export default resolver(addUser)
