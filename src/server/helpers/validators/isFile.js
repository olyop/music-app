import isEmpty from "lodash/isEmpty.js"

const isFile = file => (
  Buffer.isBuffer(file) &&
  !isEmpty(file.toString())
)

export default isFile
