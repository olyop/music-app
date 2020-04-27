import mongoose from "mongoose"
import isEmpty from "lodash/isEmpty.js"
import isArray from "lodash/isArray.js"
import mapValues from "lodash/mapValues.js"

const { ObjectId } = mongoose.Types

const deserializeDocument = ({ _id, ...doc }) => ({
  id: _id.toString(),
  dateCreated: Math.floor(ObjectId(_id).getTimestamp().getTime() / 1000),
  ...mapValues(doc, val => {
    if (isArray(val) && !isEmpty(val)) {
      if (val[0] instanceof ObjectId) {
        return val.map(id => id.toString())
      } else {
        return val
      }
    } else if (val instanceof ObjectId) {
      return val.toString()
    } else {
      return val
    }
  }),
})

export default deserializeDocument
