import isImg from "./isImg.js"
import isText from "./isText.js"
import isString from "lodash/isString.js"
import isArrayOfUuids from "./isArrayOfUuids.js"

const isReleased = released => (
  isString(released) &&
  !Number.isNaN(Date.parse(released)) &&
  Date.parse(released) >= 1
)

const isAlbum = ({
  title,
  cover,
  released,
  artistIds,
}) => (
  isImg(cover) &&
  isText(title) &&
  isReleased(released) &&
  isArrayOfUuids(artistIds)
)

export default isAlbum
