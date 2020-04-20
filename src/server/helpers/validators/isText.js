import isEmpty from "lodash/isEmpty.js"
import isString from "lodash/isString.js"

const isText = text => (
  isString(text) &&
  !isEmpty(text) &&
  text.length <= 2048
)

export default isText
