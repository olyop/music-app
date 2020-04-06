import database from "../../../database/index.js"
import { resolver } from "../../../helpers/misc.js"
import { determineAlbumSelect } from "../../../helpers/resolvers.js"
import { deserializeDocument } from "../../../helpers/collections.js"

const { UserAlbum, Album } = database.models

const rmUserAlbum = async ({ args, info }) => {
  const { userId, albumId } = args

  const filter = { user: userId, album: albumId }

  await UserAlbum.findOneAndUpdate(filter, { inLibrary: false }).exec()

  const query =
    Album.findById(albumId)
      .select(determineAlbumSelect(info))
      .lean()
      .exec()

  return deserializeDocument(await query)
}

export default resolver(rmUserAlbum)
