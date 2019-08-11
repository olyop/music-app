import { Album } from "../models/index.js"

import { serializeCollection } from "../../helpers/collection.js"

export default {
  albums: async ({ id }) => {
    const query = Album.find({ label: id })
    const result = await query.exec()
    return serializeCollection(result)
  }
}
