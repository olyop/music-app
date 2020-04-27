import isEmpty from "lodash/isEmpty.js"
import isString from "lodash/isString.js"

const isText = (text, canBeEmpty = false) => (
  isString(text) &&
  (canBeEmpty ? true : !isEmpty(text)) &&
  text.length <= 2048
)

export default isText
