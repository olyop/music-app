import database from "../../../database/index.js"
import resolver from "../../../helpers/utilities/resolver.js"
import { albumSelect } from "../../../helpers/mongodb/select.js"
import deserializeDocument from "../../../helpers/mongodb/deserializeDocument.js"

const { Album, UserAlbum } = database.models

const addUserAlbum = async ({ args, info }) => {
  const { userId, albumId } = args

  const filter = { user: userId, album: albumId }
  const exists = await UserAlbum.exists(filter)

  if (exists) {
    await UserAlbum.findOneAndUpdate(filter, { inLibrary: true }).exec()
  } else {
    await UserAlbum.create({ ...filter, inLibrary: true })
  }

  const query =
    Album.findById(albumId)
      .select(albumSelect(info))
      .lean()
      .exec()

  return deserializeDocument(await query)
}

export default resolver(addUserAlbum)
