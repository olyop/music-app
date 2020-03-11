import database from "../../database/index.js"
import { resolver } from "../../helpers/misc.js"

import {
  deserializeDocument,
  determineUserSelect,
  determineAlbumSelect,
} from "../../helpers/resolvers.js"

const { User, Song, Album } = database.models

export default {
  user: resolver(
    async ({ info, parent: { user } }) => {
      const query = User.findById(user)
      const select = determineUserSelect(info)
      const doc = await query.select(select).lean().exec()
      return deserializeDocument(doc)
    },
  ),
  album: resolver(
    async ({ info, parent: { album } }) => {
      const query = Album.findById(album)
      const select = determineAlbumSelect(info)
      const doc = await query.select(select).lean().exec()
      return deserializeDocument(doc)
    },
  ),
  numOfPlays: resolver(
    async () => {
      return 1
    },
  ),
}
