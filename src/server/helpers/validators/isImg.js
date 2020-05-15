import isFile from "./isFile.js"

const isImg = img => (
  isFile(img) &&
  img.length <= 1e7
)

export default isImg
