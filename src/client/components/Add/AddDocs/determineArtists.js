import { uniq } from "lodash"

const determineArtists = (album, songs) => {
  const albumArtists =
    album.artists.map(({ val }) => val)
  const songsArtists =
    songs.map(({ artists }) => artists)
         .flat()
         .map(({ val }) => val)
  const songsRemixers =
    songs.map(({ remixers }) => remixers)
        .flat()
        .map(({ val }) => val)
  const songsFeaturing =
    songs.map(({ featuring }) => featuring)
         .flat()
         .map(({ val }) => val)
  return uniq([
    ...albumArtists,
    ...songsArtists,
    ...songsRemixers,
    ...songsFeaturing,
  ])
}

export default determineArtists
