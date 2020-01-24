import { shape, string } from "prop-types"

export const propTypes = {
  playlist: shape({
    id: string.isRequired,
    name: string.isRequired,
  }).isRequired,
}
