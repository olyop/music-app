import database from "../../../database/index.js"
import { resolver } from "../../../helpers/misc.js"
import { deserializeDocument } from "../../../helpers/collections.js"
import { determineUserArtistSelect } from "../../../helpers/resolvers.js"

const { UserArtist } = database.models

const removeUserArtist = async ({ info, args }) => {
  const { userId, artistId } = args

  const filter = { user: userId, artist: artistId }

  const query =
    UserArtist.findOneAndUpdate(filter, { inLibrary: false })
      .setOptions({ new: true })
      .select(determineUserArtistSelect(info))
      .lean()
      .exec()

  return deserializeDocument(await query)
}

export default resolver(removeUserArtist)
