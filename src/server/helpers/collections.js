import mongoose from "mongoose"
import isEmpty from "lodash/isEmpty.js"
import isArray from "lodash/isArray.js"
import mapValues from "lodash/mapValues.js"

const { ObjectId } = mongoose.Types

export const deserializeDocument = ({ _id, __v, ...doc }) => ({
  id: _id.toString(),
  dateCreated: ObjectId(_id).getTimestamp(),
  ...mapValues(doc, val => {
    if (isArray(val) && !isEmpty(val)) {
      if (val[0] instanceof ObjectId) {
        return val.map(id => id.toString())
      } else {
        return val
      }
    } else {
      if (val instanceof ObjectId) {
        return val.toString()
      } else {
        return val
      }
    }
  }),
})

export const deserializeCollection = collection => collection.map(deserializeDocument)
