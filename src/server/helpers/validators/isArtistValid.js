import isImgValid from "./isImgValid.js"
import isTextValid from "./isTextValid.js"

const isArtistValid = ({
  name,
  photo,
}) => (
  isTextValid(name) &&
  isImgValid(photo)
)

export default isArtistValid
