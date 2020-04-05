import database from "../../../database/index.js"
import { resolver } from "../../../helpers/misc.js"
import { deserializeDocument } from "../../../helpers/collections.js"
import { determineArtistSelect } from "../../../helpers/resolvers.js"

const { UserArtist, Artist } = database.models

const addUserArtist = async ({ args, info }) => {
  const { userId, artistId } = args

  const filter = { user: userId, artist: artistId }
  const exists = await UserArtist.exists(filter)

  if (exists) {
    await UserArtist.findOneAndUpdate(filter, { inLibrary: true }).exec()
  } else {
    await UserArtist.create({ ...filter, inLibrary: true })
  }

  const query =
    Artist.findById(artistId)
      .select(determineArtistSelect(info))
      .lean()
      .exec()

  return deserializeDocument(await query)
}

export default resolver(addUserArtist)
