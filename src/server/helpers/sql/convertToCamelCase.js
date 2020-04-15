import mapKeys from "lodash/mapKeys.js"
import camelCase from "lodash/camelCase.js"

const convertToCamelCase = obj => mapKeys(
  obj,
  (_, key) => camelCase(key),
)

export default convertToCamelCase
