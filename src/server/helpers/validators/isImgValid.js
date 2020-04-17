import isEmpty from "lodash/isEmpty.js"
import isString from "lodash/isString.js"

const isImgValid = img => (
  isString(img) &&
  !isEmpty(img) &&
  img.length <= 256000
)

export default isImgValid
