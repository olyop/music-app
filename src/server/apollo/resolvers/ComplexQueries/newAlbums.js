import database from "../../../database/index.js"
import resolver from "../../../helpers/utilities/resolver.js"
import { albumSelect } from "../../../helpers/mongodb/select.js"
import deserializeCollection from "../../../helpers/mongodb/deserializeCollection.js"

const { Album } = database.models

const newAlbums = async ({ info }) => {

  const query =
    Album.find()
      .sort({ _id: "desc" })
      .select(albumSelect(info))
      .limit(12)
      .lean()
      .exec()

  return deserializeCollection(await query)
}

export default resolver(newAlbums)
