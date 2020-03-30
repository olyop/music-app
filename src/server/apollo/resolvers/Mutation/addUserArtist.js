import database from "../../../database/index.js"
import { resolver } from "../../../helpers/misc.js"
import { deserializeDocument } from "../../../helpers/collections.js"
import { determineUserArtistSelect } from "../../../helpers/resolvers.js"

const { UserArtist } = database.models

const addUserArtist = async ({ info, args }) => {
  const { userId, artistId } = args

  const filter = { user: userId, artist: artistId }
  const exists = await UserArtist.exists(filter)

  if (exists) {
    const query =
      UserArtist.findOneAndUpdate(filter, { inLibrary: true })
        .setOptions({ new: true })
        .select(determineUserArtistSelect(info))
        .lean()
        .exec()
    return deserializeDocument(await query)
  } else {
    const doc = await UserArtist.create({ ...filter, inLibrary: true })
    return deserializeDocument(doc.toObject())
  }
}

export default resolver(addUserArtist)
