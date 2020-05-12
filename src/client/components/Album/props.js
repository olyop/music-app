import { shape, string, arrayOf, object, bool } from "prop-types"

export const propTypes = {
  className: string,
  album: shape({
    cover: string,
    inLibrary: bool,
    title: string.isRequired,
    albumId: string.isRequired,
    artists: arrayOf(object).isRequired,
  }).isRequired,
}

export const defaultProps = {
  className: null,
}
