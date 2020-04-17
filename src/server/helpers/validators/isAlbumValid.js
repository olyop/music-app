import isImgValid from "./isImgValid.js"
import isString from "lodash/isString.js"
import isTextValid from "./isTextValid.js"

const isReleasedValid = released => (
  isString(released) &&
  !isNan(Date.parse(released)) &&
  Date.parse(released) >= 1
)

const isAlbumValid = ({
  title,
  released,
  cover,
}) => (
  isTextValid(title) &&
  isReleasedValid(released) &&
  isImgValid(cover)
)

export default isAlbumValid
