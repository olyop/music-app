import { shape, string, bool } from "prop-types"

export const propTypes = {
  genre: shape({
    id: string.isRequired,
    name: string.isRequired,
    inLibrary: bool.isRequired,
  }).isRequired,
}
