import isImgValid from "./isImgValid.js"
import isString from "lodash/isString.js"
import isTextValid from "./isTextValid.js"
import isArrayOfIdsValid from "./isArrayOfIdsValid.js"

const isReleasedValid = released => (
  isString(released) &&
  !isNaN(Date.parse(released)) &&
  Date.parse(released) >= 1
)

const isAlbumValid = ({
  title,
  cover,
  artists,
  released,
}) => (
  isTextValid(title) &&
  isImgValid(cover) &&
  isArrayOfIdsValid(artists) &&
  isReleasedValid(released)
)

export default isAlbumValid
