import isImg from "./isImg.js"
import isText from "./isText.js"

const isArtist = ({
  name,
  photo,
}) => (
  isText(name) &&
  isImg(photo)
)

export default isArtist
