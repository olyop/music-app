import find from "lodash/find.js"
import concat from "lodash/concat.js"

export const serializeDocument = ({ _id, __v, ...values }) => ({ ...values, id: _id })
export const serializeCollection = collection => collection.map(serializeDocument)

export const restoreOrder = ids => collection => ids.reduce(
  (acc, id) => concat(acc, find(collection, { id })),
  []
)
