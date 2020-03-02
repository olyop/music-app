import { shape, string } from "prop-types"

export const propTypes = {
  match: shape({ path: string.isRequired }).isRequired,
}
