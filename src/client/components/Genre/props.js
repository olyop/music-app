import { string, shape } from "prop-types"

export const propTypes = {
  genre: shape({
    id: string.isRequired,
    name: string.isRequired,
  }).isRequired,
}
