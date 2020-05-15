import isUuid from "./isUuid.js"
import isText from "./isText.js"
import isAudio from "./isAudio.js"
import isInteger from "lodash/isInteger.js"
import isArrayOfUuids from "./isArrayOfUuids.js"

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
  isAudio(audio) &&
  isUuid(albumId) &&
  isText(mix, true) &&
  isArrayOfUuids(genreIds) &&
  isArrayOfUuids(artistIds) &&
  isPositiveInt(discNumber) &&
  isArrayOfUuids(remixerIds) &&
  isPositiveInt(trackNumber) &&
  isArrayOfUuids(featuringIds)
)

export default isSong
