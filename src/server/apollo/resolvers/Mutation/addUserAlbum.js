import database from "../../../database/index.js"
import { resolver } from "../../../helpers/misc.js"
import { deserializeDocument } from "../../../helpers/collections.js"
import { determineUserAlbumSelect } from "../../../helpers/resolvers.js"

const { UserAlbum } = database.models

const addUserAlbum = async ({ info, args }) => {
  const { userId, albumId } = args

  const filter = { user: userId, album: albumId }
  const exists = await UserAlbum.exists(filter)

  if (exists) {
    const query =
      UserAlbum.findOneAndUpdate(filter, { inLibrary: true })
        .setOptions({ new: true })
        .select(determineUserAlbumSelect(info))
        .lean()
        .exec()
    return deserializeDocument(await query)
  } else {
    const doc = await UserAlbum.create({ ...filter, inLibrary: true })
    return deserializeDocument(doc.toObject())
  }
}

export default resolver(addUserAlbum)
