import mapKeys from "lodash/mapKeys.js"
import snakeCase from "lodash/snakeCase.js"

const convertToSnakeCase = obj => mapKeys(
  obj,
  (_, key) => snakeCase(key),
)

export default convertToSnakeCase
