import { string, shape } from "prop-types"

export const propTypes = {
  artist: shape({
    artistId: string.isRequired,
    name: string.isRequired,
    photo: string.isRequired,
  }).isRequired,
}
