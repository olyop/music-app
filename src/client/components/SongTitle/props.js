import { shape, string, bool } from "prop-types"

export const propTypes = {
  song: shape({
    id: string.isRequired,
    mix: string.isRequired,
    title: string.isRequired,
  }),
  showRemixers: bool.isRequired,
}
