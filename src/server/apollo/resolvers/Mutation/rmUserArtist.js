import database from "../../../database/index.js"
import { resolver } from "../../../helpers/misc.js"
import { determineArtistSelect } from "../../../helpers/resolvers.js"
import { deserializeDocument } from "../../../helpers/collections.js"

const { UserArtist, Artist } = database.models

const rmUserArtist = async ({ args, info }) => {
  const { userId, artistId } = args

  const filter = { user: userId, artist: artistId }

  await UserArtist.findOneAndUpdate(filter, { inLibrary: false }).exec()

  const query =
    Artist.findById(artistId)
      .select(determineArtistSelect(info))
      .lean()
      .exec()

  return deserializeDocument(await query)
}

export default resolver(rmUserArtist)
