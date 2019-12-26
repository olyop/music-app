import { shape, string, number, arrayOf, object } from "prop-types"

export const propTypes = {
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
    }),
  }),
}

export const defaultProps = {
  className: undefined,
}
