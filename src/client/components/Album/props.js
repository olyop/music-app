import { shape, string, arrayOf, object, bool } from "prop-types"

export const propTypes = {
  album: shape({
    id: string.isRequired,
    title: string.isRequired,
    inLibrary: bool.isRequired,
    artists: arrayOf(object).isRequired,
  }).isRequired,
}
