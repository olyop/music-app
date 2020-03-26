import { shape, string, arrayOf, object } from "prop-types"

export const propTypes = {
  album: shape({
    id: string.isRequired,
    title: string.isRequired,
    artists: arrayOf(object).isRequired,
  }).isRequired,
}
