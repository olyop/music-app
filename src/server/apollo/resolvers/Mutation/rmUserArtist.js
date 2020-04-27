import database from "../../../database/index.js"
import resolver from "../../../helpers/utilities/resolver.js"
import { artistSelect } from "../../../helpers/mongodb/select.js"
import deserializeDocument from "../../../helpers/mongodb/deserializeDocument.js"

const { UserArtist, Artist } = database.models

const rmUserArtist = async ({ args, info }) => {
  const { userId, artistId } = args

  const filter = { user: userId, artist: artistId }

  await UserArtist.findOneAndUpdate(filter, { inLibrary: false }).exec()

  const query =
    Artist.findById(artistId)
      .select(artistSelect(info))
      .lean()
      .exec()

  return deserializeDocument(await query)
}

export default resolver(rmUserArtist)
