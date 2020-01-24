import { string, shape, number, arrayOf, object } from "prop-types"

export const propTypes = {
  className: string,
  song: shape({
    id: string.isRequired,
    mix: string.isRequired,
    title: string.isRequired,
    duration: number.isRequired,
    album: shape({
      id: string.isRequired,
      title: string.isRequired,
    }),
    genres: arrayOf(object).isRequired,
    artists: arrayOf(object).isRequired,
    remixers: arrayOf(object).isRequired,
    featuring: arrayOf(object).isRequired,
  }).isRequired,
}

export const defaultProps = {
  className: undefined,
}
