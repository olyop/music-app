import isEmpty from "lodash/isEmpty.js"

const isImgValid = img => (
  Buffer.isBuffer(img) &&
  !isEmpty(img) &&
  img.length <= 250000
)

export default isImgValid
