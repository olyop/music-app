import { shape, string, bool } from "prop-types"

export const propTypes = {
  genre: shape({
    genreId: string.isRequired,
    name: string.isRequired,
    inLibrary: bool.isRequired,
  }).isRequired,
}
