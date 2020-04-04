import database from "../../../database/index.js"
import { resolver } from "../../../helpers/misc.js"
import { USER_EMPTY_QUEUE } from "../../../globals.js"
import { deserializeDocument } from "../../../helpers/collections.js"

const { User } = database.models

const addUser = async ({ args }) => {
  const { name } = args

  const doc = await User.create({
    name,
    songs: [],
    albums: [],
    artists: [],
    playlists: [],
    ...USER_EMPTY_QUEUE,
  })

  return deserializeDocument(doc.toObject())
}

export default resolver(addUser)
