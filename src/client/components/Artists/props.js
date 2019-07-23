import { array, object, func } from "prop-types"

export const propTypes = {
  artists: array.isRequired,
  hasReceived: object.isRequired,
  syncArtists: func.isRequired,
  hasReceivedArtists: func.isRequired
}
