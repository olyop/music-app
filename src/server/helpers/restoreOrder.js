import find from "lodash/find.js"
import concat from "lodash/concat.js"

const restoreOrder = ids => collection => ids.reduce(
  (acc, id) => concat(acc, find(collection, { id })),
  [],
)

export default restoreOrder
