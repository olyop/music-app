import { shape, string, bool } from "prop-types"

export const propTypes = {
  song: shape({
    mix: string.isRequired,
    title: string.isRequired,
    songId: string.isRequired,
  }),
  showRemixers: bool.isRequired,
}
