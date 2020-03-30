import database from "../../../database/index.js"
import { resolver } from "../../../helpers/misc.js"
import { deserializeDocument } from "../../../helpers/collections.js"
import { determineUserAlbumSelect } from "../../../helpers/resolvers.js"

const { UserAlbum } = database.models

const removeUserAlbum = async ({ info, args }) => {
  const  { userId, albumId } = args

  const filter = { user: userId, album: albumId }

  const query =
    UserAlbum.findOneAndUpdate(filter, { inLibrary: false })
      .setOptions({ new: true })
      .select(determineUserAlbumSelect(info))
      .lean()
      .exec()

  return deserializeDocument(await query)
}

export default resolver(removeUserAlbum)
