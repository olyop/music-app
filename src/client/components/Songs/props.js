import { array, func, object } from "prop-types"

export const propTypes = {
  songs: array.isRequired,
  albums: array.isRequired,
  artists: array.isRequired,
  syncSongs: func.isRequired,
  syncAlbums: func.isRequired,
  syncArtists: func.isRequired,
  hasReceivedSongs: func.isRequired,
  hasReceivedAlbums: func.isRequired,
  hasReceivedArtists: func.isRequired,
  hasReceived: object.isRequired
}
