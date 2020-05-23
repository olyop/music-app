import { pipe } from "../../../helpers"
import { map, flatten, uniq } from "lodash/fp"

const determineAlbumArtists = album =>
  album.artists.map(({ val }) => val)

const determineSongArtists = songs =>
  pipe(songs)(
    map(({ artists, remixers, featuring }) => [
      ...artists,
      ...remixers,
      ...featuring,
    ]),
    flatten,
    map(({ val }) => val),
  )

const determineArtists = (album, songs) => uniq([
  ...determineSongArtists(songs),
  ...determineAlbumArtists(album),
])

export default determineArtists
