import {
  resolver,
  albumSelect,
  deserializeCollection,
} from "../../../helpers/index.js"

import database from "../../../database/index.js"

const { Album } = database.models

const newAlbums = async ({ info }) => {

  const query =
    Album.find()
         .sort({ _id: "desc" })
         .select(albumSelect(info))
         .limit(10)
         .lean()
         .exec()

  return deserializeCollection(await query)
}

export default resolver(newAlbums)
