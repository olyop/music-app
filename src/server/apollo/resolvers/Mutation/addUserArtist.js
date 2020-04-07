import database from "../../../database/index.js"

import {
  resolver,
  artistSelect,
  deserializeDocument,
} from "../../../helpers/index.js"

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
      .select(artistSelect(info))
      .lean()
      .exec()

  return deserializeDocument(await query)
}

export default resolver(addUserArtist)
