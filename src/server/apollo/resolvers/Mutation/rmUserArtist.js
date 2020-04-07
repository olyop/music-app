import database from "../../../database/index.js"

import {
  resolver,
  artistSelect,
  deserializeDocument,
} from "../../../helpers/index.js"

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
