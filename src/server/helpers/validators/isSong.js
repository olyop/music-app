import isFile from "./isFile.js"
import isUuid from "./isUuid.js"
import isText from "./isText.js"
import _ from "lodash/isInteger.js"
import isArrayOfUuids from "./isArrayOfUuids.js"

const isAudioValid = audio => (
  isFile(audio) &&
  audio.length <= 5e7
)

const isPositiveInt = integer => (
  isInteger(integer) &&
  integer >= 0
)

const isSong = ({
  mix,
  title,
  audio,
  genres,
  albumId,
  artists,
  remixers,
  featuring,
  discNumber,
  trackNumber,
}) => (
  isText(mix) &&
  isText(title) &&
  isUuid(albumId) &&
  isAudioValid(audio) &&
  isArrayOfUuids(genres) &&
  isArrayOfUuids(artists) &&
  isArrayOfUuids(remixers) &&
  isArrayOfUuids(featuring) &&
  isPositiveInt(discNumber) &&
  isPositiveInt(trackNumber)
)

export default isSong
