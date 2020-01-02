import { User } from "../models/index.js"

import { resolver } from "../../helpers/misc.js"
import { serializeDocument } from "../../helpers/collection.js"

export default {
  user: resolver(
    async ({ args }) => {
      const { id } = args
      const query = User.findById(id)
      const doc = await query.lean().exec()
      return serializeDocument(doc)
    }
  )
}
