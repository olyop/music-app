import { pipe } from "../../helpers"
import { isEmpty, uniqueId } from "lodash"
import { strHasBrackets, strFindBrackets, splitList } from "./common"

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

const removeFeat = artist =>
  (artist.includes(" feat") ?
    artist.slice(0, artist.indexOf(" feat")) :
    artist)

export const determineArtists = ({ artist }) =>
  pipe(artist)(removeFeat, splitList)

const determineFeaturing = ({ artist }) => {
  if (artist.includes("feat.")) {
    const str = artist.slice(artist.indexOf("feat.") + 6, artist.length)
    return splitList(str)
  } else {
    return []
  }
}

const removeMix = str =>
  (str.includes("Extended") ?
    str.slice(0, str.indexOf("Extended") - 1) :
    str)

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

export const determineDiscNumber = ({ disk }) =>
  disk?.no || 1

export const determineTrackNumber = ({ track }) =>
  track?.no || 1

export const determineDuration = ({ duration }) =>
  Math.floor(duration)

const createSong = ({ audio, id3: { common, format } }) => ({
  audio,
  songId: uniqueId(),
  album: common.album,
  mix: determineMix(common),
  title: determineTitle(common),
  genres: determineGenres(common),
  artists: determineArtists(common),
  remixers: determineRemixers(common),
  duration: determineDuration(format),
  featuring: determineFeaturing(common),
  discNumber: determineDiscNumber(common),
  trackNumber: determineTrackNumber(common),
})

export default createSong
