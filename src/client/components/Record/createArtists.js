import { determineArtists } from "./createSong"

const createArtists = files =>
  files.map(({ id3 }) => id3.common)
       .map(determineArtists)
       .flat()

export default createArtists
