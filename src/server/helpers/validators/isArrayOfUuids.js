import isUuid from "./isUuid.js"
import every from "lodash/fp/every.js"
import isEmpty from "lodash/isEmpty.js"

const isArrayOfUuids = ids => (
  Array.isArray(ids) &&
  (isEmpty(ids) ? true : every(isUuid))
)

export default isArrayOfUuids
