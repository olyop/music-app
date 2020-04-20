import isUuid from "./isUuid.js"
import every from "lodash/fp/every.js"
import isArray from "lodash/isArray.js"
import isEmpty from "lodash/isEmpty.js"

const isArrayOfUuids = ids => (
  isArray(ids) &&
  (isEmpty(ids) ? true : every(isUuid))
)

export default isArrayOfUuids
