import { array, object, func } from "prop-types"

export const propTypes = {
  artists: array.isRequired,
  albums: array.isRequired,
  hasReceived: object.isRequired,
  syncArtists: func.isRequired,
  syncAlbums: func.isRequired,
  hasReceivedArtists: func.isRequired,
  hasReceivedAlbums: func.isRequired
}
