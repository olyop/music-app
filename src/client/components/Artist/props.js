import { string, shape } from "prop-types"

export const propTypes = {
  artist: shape({
    id: string.isRequired,
    name: string.isRequired
  }).isRequired
}
