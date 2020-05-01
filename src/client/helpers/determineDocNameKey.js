import { isUndefined } from "lodash"

const determineDocNameKey = doc =>
  (isUndefined(doc.name) ? "title" : "name")

export default determineDocNameKey
