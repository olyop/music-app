import { shape, string, number, arrayOf, object, bool } from "prop-types"

export const propTypes = {
  showAdd: bool,
  showCover: bool,
  className: string,
  song: shape({
    id: string.isRequired,
    mix: string.isRequired,
    title: string.isRequired,
    duration: number.isRequired,
    featuring: arrayOf(object).isRequired,
    remixers: arrayOf(object).isRequired,
    artists: arrayOf(object).isRequired,
    album: shape({
      id: string.isRequired,
      title: string.isRequired,
    }).isRequired,
  }).isRequired,
}

export const defaultProps = {
  showAdd: false,
  showCover: true,
  className: undefined,
}
