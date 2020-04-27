import isFile from "./isFile.js"

const isImg = img => (
  isFile(img) &&
  img.length <= 1e6
)

export default isImg
