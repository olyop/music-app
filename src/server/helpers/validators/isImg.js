import isFile from "./isFile.js"

const isImg = img => (
  isFile(img) &&
  img.length <= 2.5e5
)

export default isImg
