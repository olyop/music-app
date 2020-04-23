import isEmpty from "lodash/isEmpty.js"
import isString from "lodash/isString.js"

const isText = (text, empty = false) => (
  isString(text) &&
  empty ? true : !isEmpty(text) &&
  text.length <= 2048
)

export default isText
