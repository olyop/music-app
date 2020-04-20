import isUuidValid from "uuid-validate"
import isString from "lodash/isString.js"

const isUuid = uuid => (
  isString(uuid) &&
  isUuidValid(uuid)
)

export default isUuid
