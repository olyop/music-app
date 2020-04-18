import isUuid from "uuid-validate"
import every from "lodash/fp/every.js"
import isArray from "lodash/isArray.js"
import isString from "lodash/isString.js"

const isArrayOfIdsValid = ids => (
  isArray(ids) &&
  every(isString) &&
  every(isUuid)
)

export default isArrayOfIdsValid
