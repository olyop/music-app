import database from "../../../database/index.js"
import { albumSelect } from "../../../helpers/mongodb/select.js"
import deserializeDocument from "../../../helpers/mongodb/deserializeDocument.js"

const { UserAlbum, Album } = database.models

const rmUserAlbum = async ({ args, info }) => {
  const { userId, albumId } = args

  const filter = { user: userId, album: albumId }

  await UserAlbum.findOneAndUpdate(filter, { inLibrary: false }).exec()

  const query =
    Album.findById(albumId)
      .select(albumSelect(info))
      .lean()
      .exec()

  return deserializeDocument(await query)
}

export default rmUserAlbum
