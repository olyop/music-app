import { shape, string, number, arrayOf, object } from "prop-types"

export const propTypes = {
  song: shape({
    id: string.isRequired,
    title: string.isRequired,
    mix: string.isRequired,
    trackNumber: number.isRequired,
    discNumber: number.isRequired,
    duration: number.isRequired,
    featuring: arrayOf(object).isRequired,
    remixers: arrayOf(object).isRequired,
    artists: arrayOf(object).isRequired,
    album: shape({
      id: string.isRequired,
      title: string.isRequired,
      released: number.isRequired,
    }),
  }),
}
