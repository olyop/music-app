import find from "lodash/find.js"
import concat from "lodash/concat.js"
import uniqBy from "lodash/uniqBy.js"

export const serializeDocument = ({ _id, __v, ...values }) => ({ ...values, id: _id })
export const serializeCollection = collection => collection.map(serializeDocument)

export const restoreOrder = ids => collection => ids.reduce(
  (acc, id) => concat(acc, find(collection, { id })),
  []
)

export const removeDup = collection => uniqBy(collection, "id")
