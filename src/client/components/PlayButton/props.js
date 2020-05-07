import { string, shape, number, arrayOf, object } from "prop-types"

export const propTypes = {
  className: string,
  song: shape({
    mix: string.isRequired,
    title: string.isRequired,
    songId: string.isRequired,
    duration: number.isRequired,
    album: shape({
      title: string.isRequired,
      albumId: string.isRequired,
    }),
    genres: arrayOf(object).isRequired,
    artists: arrayOf(object).isRequired,
    remixers: arrayOf(object).isRequired,
    featuring: arrayOf(object).isRequired,
  }).isRequired,
}

export const defaultProps = {
  className: null,
}
