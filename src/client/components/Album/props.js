import { shape, string, arrayOf, object, bool } from "prop-types"

export const propTypes = {
  album: shape({
    albumId: string.isRequired,
    title: string.isRequired,
    cover: string.isRequired,
    inLibrary: bool.isRequired,
    artists: arrayOf(object).isRequired,
  }).isRequired,
}
