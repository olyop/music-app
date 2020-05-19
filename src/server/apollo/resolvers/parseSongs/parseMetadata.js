import {
  splitList,
  strHasBrackets,
  strFindBrackets,
} from "./common.js"

import isEmpty from "lodash/isEmpty.js"
import pipe from "../../../helpers/utils/pipe.js"
import toDataUrl from "../../../helpers/resolver/toDataUrl.js"

const removeMix = str =>
  (str.includes("Extended") ?
    str.slice(0, str.indexOf("Extended") - 1) :
    str)

const removeFeat = artist =>
  (artist.includes(" feat") ?
    artist.slice(0, artist.indexOf(" feat")) :
    artist)

const determineTitle = ({ title }) => {
  if (strHasBrackets(title)) {
    const brackets = strFindBrackets(title)
    return title.slice(0, title.indexOf(brackets) - 2)
  } else {
    return title
  }
}

const determineMix = ({ title }) => {
  if (title.includes("Extended")) {
    return "Extended"
  } else if (title.includes("Original")) {
    return "Original"
  } else {
    return ""
  }
}

const determineArtists = ({ artist }) =>
  pipe(artist)(removeFeat, splitList)

const determineFeaturing = ({ artist }) => {
  if (artist.includes("feat.")) {
    const str = artist.slice(artist.indexOf("feat.") + 6, artist.length)
    return splitList(str)
  } else {
    return []
  }
}

const determineRemixers = ({ title }) => {
  if (strHasBrackets(title)) {
    const brackets = strFindBrackets(title)
    if (brackets.includes("Remix")) {
      const list = brackets.slice(0, brackets.lastIndexOf("Remix") - 1)
      return pipe(list)(removeMix, splitList)
    } else {
      return []
    }
  } else {
    return []
  }
}

const determineGenres = ({ genre }) =>
  (isEmpty(genre) ? [] : genre)

const determineDiscNumber = ({ disk }) =>
  disk?.no || 1

const determineTrackNumber = ({ track }) =>
  track?.no || 1

const determineDuration = ({ duration }) =>
  Math.floor(duration)

const determineAlbum = ({ album, albumartist, year, picture }) => ({
  title: album,
  released: `01/01/${year}`,
  artists: splitList(albumartist),
  cover: toDataUrl(picture[0].data),
})

const parseMetadata = ({ common, format }) => ({
  mix: determineMix(common),
  album: determineAlbum(common),
  title: determineTitle(common),
  genres: determineGenres(common),
  artists: determineArtists(common),
  remixers: determineRemixers(common),
  duration: determineDuration(format),
  featuring: determineFeaturing(common),
  discNumber: determineDiscNumber(common),
  trackNumber: determineTrackNumber(common),
})

export default parseMetadata
