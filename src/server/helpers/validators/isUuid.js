import isString from "lodash/isString.js"
import { NIL_UUID } from "../../globals/miscellaneous.js"

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const isUuid = uuid =>
  isString(uuid) &&
  (uuidRegex.test(uuid) || NIL_UUID === uuid)

export default isUuid
