import find from "lodash/find.js"
import concat from "lodash/concat.js"
import uniqBy from "lodash/uniqBy.js"
import isArray from "lodash/isArray.js"
import mapValues from "lodash/mapValues.js"

export const serializeDocument = ({ _id, __v, ...doc }) => ({
  id: _id.toHexString(),
  ...mapValues(doc, val => {
    if (isArray(val)) {
      return val.map(id => id.toHexString())
    } else {
      return val
    }
  }),
})

export const serializeCollection = collection => collection.map(serializeDocument)

export const restoreOrder = ids => collection => ids.reduce(
  (acc, id) => concat(acc, find(collection, { id })),
  [],
)

export const removeDup = collection => uniqBy(collection, "id")
