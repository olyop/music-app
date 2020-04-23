import isFile from "./isFile.js"
import isUuid from "./isUuid.js"
import isText from "./isText.js"
import isInteger from "lodash/isInteger.js"
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
  albumId,
  genreIds,
  artistIds,
  remixerIds,
  discNumber,
  trackNumber,
  featuringIds,
}) => (
  isText(title) &&
  isUuid(albumId) &&
  isText(mix, true) &&
  isAudioValid(audio) &&
  isArrayOfUuids(genreIds) &&
  isArrayOfUuids(artistIds) &&
  isPositiveInt(discNumber) &&
  isArrayOfUuids(remixerIds) &&
  isPositiveInt(trackNumber) &&
  isArrayOfUuids(featuringIds)
)

export default isSong
